import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// Cache trig tables so we don't recalc sines/cosines each frame
const trigTableCache = new Map();

const getTrigTables = (points) => {
  const cached = trigTableCache.get(points);
  if (cached) return cached;
  const angles = new Array(points);
  const sin = new Array(points);
  const cos = new Array(points);
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    angles[i] = angle;
    sin[i] = Math.sin(angle);
    cos[i] = Math.cos(angle);
  }
  const tables = { angles, sin, cos };
  trigTableCache.set(points, tables);
  return tables;
};

const AnimatedOrbHeroBG = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const parentOrbRef = useRef(null);
  const childrenGroupRef = useRef(null);

  // Refs to store mutable values that don't trigger re-renders
  const orbStatesRef = useRef([]);
  const childOrbsRef = useRef([]);
  const particlesRef = useRef([]);
  const viewportSizeRef = useRef({ vw: 800, vh: 800 });
  const parentCenterBaseRef = useRef({ x: 400, y: 400 });
  const parentCenterRef = useRef({ x: 400, y: 400 });
  const orbScaleRef = useRef(1);
  const lastWheelTimeRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  
  // New refs for enhanced features
  const scrollPositionRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const orbReturnAnimationsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isHeroVisibleRef = useRef(true);
  const childPositionsRef = useRef([]);
  const parentVelocityRef = useRef({ x: 0, y: 0 });
  const dataTransmissionsRef = useRef([]);
  const lastTransmissionTimeRef = useRef({});
  const scrollDirectionRef = useRef('up');
  const lastScrollYRef = useRef(0);
  const orbsDispersedRef = useRef(false);

  const childCount = 5;
  const parentRadius = 36; // 20% smaller than 45
  const childRadius = 14; // 20% smaller than 18
  const parentPoints = 64; // Balanced for performance
  const childPoints = 32; // Optimized for smooth performance
  const childAmp = 0.3; // Reduced amplitude for smoother shapes
  const orbMorphDirections = [];
  const orbMorphSpeeds = [];

  // --- Utility functions ---
  const hslToHex = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
  };

  const lerpColor = (a, b, t) => {
    const ah = parseInt(a.replace('#', ''), 16), bh = parseInt(b.replace('#', ''), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1);
  };

  const generateSuperSmoothBlob = (cx, cy, r, points, t, amp = 1, phase = 0) => {
    const { angles, sin, cos } = getTrigTables(points);
    const pts = [];
    for (let i = 0; i < points; i++) {
      const angle = angles[i];
      // Full complexity noise for ethereal effect
      const noise =
        Math.sin(angle * 3 + t * 0.7 + phase) * 1.5 * amp +
        Math.sin(angle * 5 - t * 1.1 + phase) * 0.8 * amp +
        Math.sin(angle * 2 + t * 1.7 + phase) * 0.5 * amp;
      const rad = r + noise;
      pts.push({
        x: cx + cos[i] * rad,
        y: cy + sin[i] * rad
      });
    }
    let d = "";
    for (let i = 0; i < points; i++) {
      const p0 = pts[(i - 1 + points) % points];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % points];
      const p3 = pts[(i + 2) % points];
      if (i === 0) {
        d += `M${p1.x.toFixed(2)},${p1.y.toFixed(2)}`;
      }
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
    }
    d += "Z";
    return d;
  };

  const getDynamicColorFamily = (i, now) => {
    const baseHue = (i * 67 + now * 0.018) % 360;
    const hue2 = (baseHue + 40 + 20 * Math.sin(now * 0.0007 + i)) % 360;
    const sat = 80 + 10 * Math.sin(now * 0.0005 + i);
    const light1 = 60 + 10 * Math.cos(now * 0.0004 + i * 2);
    const light2 = 35 + 15 * Math.sin(now * 0.0006 + i * 3);
    return [hslToHex(baseHue, sat, light1), hslToHex(hue2, sat, light2)];
  };
  
  const approach = (current, target, speed) => {
    return current + (target - current) * speed;
  };

  const dampedSpring = (current, target, velocity, stiffness, damping) => {
    const force = (target - current) * stiffness;
    velocity += force;
    velocity *= damping;
    current += velocity;
    return [current, velocity];
  };

  const emitParticles = (x, y, color, count = 2, i = 0, now = 0) => {
    if (!particlesRef.current) particlesRef.current = [];
    for (let j = 0; j < count; j++) {
      let h = (i * 67 + now * 0.018) % 360 + (Math.random() - 0.5) * 24;
      let s = 85 + Math.random() * 10;
      let l = 55 + Math.random() * 20;
      const particleColor = hslToHex(h, s, l);
      const angle = Math.random() * 2 * Math.PI;
      const speed = 0.4 + Math.random() * 0.7;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particlesRef.current.push({
        x, y, vx, vy,
        r: 1.1 + Math.random() * 1.2,
        life: 0.6,
        decay: 0.025 + Math.random() * 0.015,
        color: particleColor,
        opacity: 0.45
      });
    }
  };


  const createDataTransmission = (childIndex, childX, childY, parentX, parentY, color) => {
    const transmissionId = `${childIndex}_${Date.now()}`;
    // Create multiple particles for a stream effect
    for (let p = 0; p < 3; p++) {
      dataTransmissionsRef.current.push({
        id: `${transmissionId}_${p}`,
        childIndex,
        startX: childX,
        startY: childY,
        endX: parentX,
        endY: parentY,
        progress: -p * 0.15, // Stagger the particles
        color,
        opacity: 0.6, // More visible effect
        particleIndex: p,
      });
    }
  };

  const updateDataTransmissions = () => {
    const transmissionsGroup = svgRef.current?.querySelector('#dataTransmissions');
    if (!transmissionsGroup) return;
    
    // Clear previous transmissions
    transmissionsGroup.innerHTML = '';
    
    // Update and filter active transmissions
    dataTransmissionsRef.current = dataTransmissionsRef.current.filter(t => t.progress < 1);
    
    for (const transmission of dataTransmissionsRef.current) {
      transmission.progress += 0.025; // Moderate transmission speed
      
      if (transmission.progress < 1 && transmission.progress > 0) {
        // Create a data packet visualization
        const t = Math.max(0, Math.min(1, transmission.progress));
        
        // Add some curve to the path
        const curve = Math.sin(t * Math.PI) * 20;
        const angle = Math.atan2(transmission.endY - transmission.startY, transmission.endX - transmission.startX);
        const perpX = -Math.sin(angle) * curve;
        const perpY = Math.cos(angle) * curve;
        
        const currentX = transmission.startX + (transmission.endX - transmission.startX) * t + perpX;
        const currentY = transmission.startY + (transmission.endY - transmission.startY) * t + perpY;
        
        // Data packet (glowing orb)
        const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        packet.setAttribute("cx", currentX.toFixed(1));
        packet.setAttribute("cy", currentY.toFixed(1));
        packet.setAttribute("r", (4 - transmission.particleIndex * 0.5).toFixed(1));
        packet.setAttribute("fill", transmission.color);
        packet.setAttribute("opacity", (transmission.opacity * (1 - t * 0.2) * (1 - transmission.particleIndex * 0.2)).toFixed(2));
        packet.setAttribute("filter", "url(#dataGlow)");
        
        transmissionsGroup.appendChild(packet);
        
        // Trail effect
        if (transmission.particleIndex === 0) {
          const trail = document.createElementNS("http://www.w3.org/2000/svg", "line");
          const trailLength = 0.15;
          const trailStart = Math.max(0, t - trailLength);
          const startX = transmission.startX + (transmission.endX - transmission.startX) * trailStart + perpX * trailStart / t;
          const startY = transmission.startY + (transmission.endY - transmission.startY) * trailStart + perpY * trailStart / t;
          
          trail.setAttribute("x1", startX.toFixed(1));
          trail.setAttribute("y1", startY.toFixed(1));
          trail.setAttribute("x2", currentX.toFixed(1));
          trail.setAttribute("y2", currentY.toFixed(1));
          trail.setAttribute("stroke", transmission.color);
          trail.setAttribute("stroke-width", "1");
          trail.setAttribute("opacity", (transmission.opacity * 0.3 * (1 - t)).toFixed(2));
          trail.setAttribute("stroke-linecap", "round");
          
          transmissionsGroup.appendChild(trail);
        }
      }
    }
  };

  // Canvas-based particle rendering for performance
  const renderCanvas = (ctx, now) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles only
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
    
    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.life -= p.decay;
      p.opacity = Math.max(0, p.life);
      
      ctx.globalAlpha = p.opacity * 0.7;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.opacity, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Get the context to update gradient colors
  const { updateGradientColors } = useOrbContext();

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) {
      console.error('SVG or Canvas not initialized');
      return;
    }

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const ctx = canvas.getContext('2d');

    // Precompute trig tables for parent and child point counts
    getTrigTables(parentPoints);
    getTrigTables(childPoints);

    parentOrbRef.current = svg.querySelector('#parentOrb');
    childrenGroupRef.current = svg.querySelector('#children');
    
    const makeOrbState = () => ({
      drag: 0, dragTarget: 0, dragV: 0,
      squash: 0, squashTarget: 0, squashV: 0,
      mouseDir: 0, mouseDirTarget: 0, mouseDirV: 0,
      wobble: 0, lastUpdate: performance.now(),
      parallaxOffset: { x: 0, y: 0 },
      parallaxVelocity: { x: 0, y: 0 },
      isReturning: false, returnProgress: 0,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      dispersed: false,
      disperseTarget: { x: 0, y: 0 },
      disperseProgress: 0,
      assembleProgress: 1,
      // 3D Orbital parameters
      orbitalAngle: Math.random() * Math.PI * 2,  // Random starting angle
      orbitalRadius: 70, // Default radius
      orbitalInclination: 0, // Tilt of orbital plane
      orbitalEccentricity: 0.5, // Default elliptical
      orbitalSpeed: 1, // Default speed
      orbitalPhase: 0, // Phase offset for variety
      orbitalTilt: 0, // Additional axis tilt
      // Dynamic orbital changes
      orbitalPerturbation: { x: 0, y: 0, z: 0 }, // Temporary deviations
      orbitalTarget: { radius: 0, inclination: 0, eccentricity: 0 }, // Target state to return to
      wasVisible: true,
    });


    orbMorphDirections.length = 0;
    orbMorphSpeeds.length = 0;
    orbMorphDirections.push(Math.PI / 2); 
    orbMorphSpeeds.push(0.012);
    for (let i = 0; i < childCount; i++) {
      const angle = Math.PI / 2 + (i - (childCount - 1) / 2) * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 12);
      orbMorphDirections.push(angle);
      orbMorphSpeeds.push(0.014 + i * 0.004 + Math.random() * 0.003);
    }

    orbStatesRef.current = [makeOrbState()]; // Parent
    childOrbsRef.current = [];
    childPositionsRef.current = [];
    if (childrenGroupRef.current) {
        childrenGroupRef.current.innerHTML = '';
        for (let i = 0; i < childCount; i++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", `url(#childGrad${i})`); 
            path.setAttribute("opacity", "0.95");
            childrenGroupRef.current.appendChild(path);
            childOrbsRef.current.push(path);
            const childState = makeOrbState();
            // Initialize 3D orbital parameters - each child gets unique orbit
            childState.orbitalAngle = Math.random() * 2 * Math.PI; // Random starting position
            childState.initialAngle = childState.orbitalAngle; // Store initial angle
            
            // Create completely unique orbital parameters for each child
            const uniqueRadius = 80 + Math.random() * 80; // Radius between 80-160 for more space
            const uniqueInclination = (Math.random() - 0.5) * Math.PI / 3; // Random tilt
            const uniqueEccentricity = 0.1 + Math.random() * 0.7; // From nearly circular to very elliptical
            const uniqueSpeed = 0.5 + Math.random() * 1.0; // Speed varies from 0.5x to 1.5x
            
            // Additional unique parameters for complex motion
            childState.orbitalWobbleSpeed = 0.5 + Math.random() * 1.0; // How fast the orbit wobbles
            childState.orbitalWobbleAmount = 0.05 + Math.random() * 0.15; // How much the orbit wobbles
            childState.radiusOscillationSpeed = 0.3 + Math.random() * 0.7; // How fast radius changes
            childState.radiusOscillationAmount = 10 + Math.random() * 30; // How much radius changes (increased for more variation)
            
            const variation = {
              radius: uniqueRadius,
              inclination: uniqueInclination,
              eccentricity: uniqueEccentricity,
              speed: uniqueSpeed
            };
            childState.orbitalRadius = variation.radius;
            childState.orbitalInclination = variation.inclination;
            childState.orbitalEccentricity = variation.eccentricity;
            childState.orbitalSpeed = variation.speed;
            childState.orbitalPhase = i * Math.PI / 3; // Different start phases
            childState.orbitalTilt = 0; // No additional tilt
            // Set targets for organized return
            childState.orbitalTarget = {
              radius: childState.orbitalRadius,
              inclination: childState.orbitalInclination,
              eccentricity: childState.orbitalEccentricity
            };
            orbStatesRef.current.push(childState);
            childPositionsRef.current.push({ x: 0, y: 0, z: 0 });
        }
    }

    const adjustSVGSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      viewportSizeRef.current = { vw, vh };
      
      const maxChildIndex = childCount - 1;
      const maxOrbit = parentRadius + 120 + maxChildIndex * 40;
      const maxReach = maxOrbit + childRadius + 8;
      const minDim = Math.min(vw, vh);
      const scale = minDim / (maxReach * 2);
      
      svg.setAttribute('width', vw.toString());
      svg.setAttribute('height', vh.toString());
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      
      // Position between navbar (height ~80px) and title (starts around 15% of viewport)
      const navbarHeight = 80; // Approximate navbar height
      const titleStartY = vh * 0.15; // Where title starts (from HeroSection pt values)
      
      // Calculate max orbital extent (largest orbit + child radius)
      const maxOrbitalRadius = 95; // Largest orbit from orbital variations
      const totalMaxRadius = maxOrbitalRadius + childRadius + 10; // Add buffer
      
      // Start orbs at navbar level (right side)
      const minY = navbarHeight - 20; // Can overlap with navbar bottom
      const maxY = navbarHeight + 80; // Keep orbs very high up
      const centerY = navbarHeight; // Start position at navbar level
      
      // Dynamic positioning based on screen size
      const isMobile = vw < 768;
      const isTablet = vw >= 768 && vw < 1024;
      
      let rightOffset;
      let dynamicScale;
      
      if (isMobile) {
        rightOffset = 20; // Slight right offset on mobile
        // Ensure orbs fit within viewport minus navbar
        const availableHeight = vh - navbarHeight - 40; // 40px bottom buffer
        const availableWidth = vw - 40; // 20px margins
        const maxDimension = Math.min(availableWidth, availableHeight);
        dynamicScale = Math.min(0.85, maxDimension / (totalMaxRadius * 2.2));
      } else if (isTablet) {
        rightOffset = vw * 0.1;
        dynamicScale = 0.95;
      } else {
        rightOffset = Math.min(100, vw * 0.08); // Position further right, under nav buttons
        dynamicScale = 1;
      }
      
      const finalScale = scale * dynamicScale;
      
      parentCenterBaseRef.current = { x: vw * 0.5 + rightOffset, y: centerY };
      parentCenterRef.current = { x: vw * 0.5 + rightOffset, y: centerY };
      orbScaleRef.current = finalScale;
    };

    adjustSVGSize();
    window.addEventListener('resize', adjustSVGSize);

    // Mouse move handler for cursor effect
    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced scroll handling - only affects parent orb
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const now = performance.now();
      const dt = now - lastScrollTimeRef.current;
      
      if (dt > 0) {
        scrollVelocityRef.current = (scrollY - scrollPositionRef.current) / dt * 120;
      }
      
      scrollPositionRef.current = scrollY;
      lastScrollTimeRef.current = now;
      
      const heroHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      
      // Always keep animation running
      if (!animationFrameIdRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
      
      // Only parent orb responds to scroll - much gentler
      const parentState = orbStatesRef.current[0];
      if (parentState) {
        parentState.dragTarget += scrollVelocityRef.current * 0.3;
        parentVelocityRef.current.y = scrollVelocityRef.current * 0.15;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const handleWheel = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastWheelTimeRef.current);
      lastWheelTimeRef.current = now;
      const velocity = Math.max(-80, Math.min(80, e.deltaY / dt * 120));
      
      // Only affect parent orb with wheel
      const parentState = orbStatesRef.current[0];
      if (parentState && orbMorphDirections[0] !== undefined) {
        const angle = orbMorphDirections[0];
        parentState.dragTarget += (Math.sin(angle) * velocity * 1.8 + Math.cos(angle) * velocity * 0.7);
      }
      e.preventDefault();
    };
    
    const eventTarget = svg;
    eventTarget.addEventListener('wheel', handleWheel, { passive: false });

    const animate = () => {
      if (!svgRef.current || !parentOrbRef.current || !childrenGroupRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Always continue animation - never stop

      const now = performance.now();
      
      // Update gradient colors in context for navbar orb
      const baseHue = (now * 0.01) % 360;
      const startHue = baseHue;
      const endHue = (baseHue + 60 * Math.sin(now * 0.00015 + Math.PI * 0.5)) % 360;
      const startColor = hslToHex(startHue, 80, 60);
      const endColor = hslToHex(endHue, 80, 60);
      updateGradientColors({ start: startColor, end: endColor });
      
      const parentStops = [
        { id: "p0", phase: 0 }, { id: "p1", phase: Math.PI * 0.5 },
        { id: "p2", phase: Math.PI }, { id: "p3", phase: Math.PI * 1.5 }
      ];
      for (let i = 0; i < parentStops.length; i++) {
        const stop = parentStops[i];
        const hue = (baseHue + 60 * Math.sin(now * 0.00015 + stop.phase)) % 360;
        const sat = 80 + 10 * Math.sin(now * 0.0002 + stop.phase);
        const light = 60 + 10 * Math.cos(now * 0.00018 + stop.phase);
        const stopEl = svgRef.current.querySelector(`#${stop.id}`);
        if (stopEl) stopEl.setAttribute("stop-color", hslToHex(hue, sat, light));
      }

      // Update parent orb physics
      const parentState = orbStatesRef.current[0];
      if (parentState && orbMorphDirections[0] !== undefined) {
        const spring = 0.06 * (1 + orbMorphSpeeds[0]);
        const damping = 0.94 - orbMorphSpeeds[0] * 0.2;
        [parentState.drag, parentState.dragV] = dampedSpring(parentState.drag, parentState.dragTarget, parentState.dragV, spring, damping);
        if (Math.abs(parentState.dragTarget) < 0.1 && Math.abs(parentState.drag) > 0.1) {
          parentState.wobble += 0.04 + orbMorphSpeeds[0] * 0.9;
          parentState.drag += Math.sin(parentState.wobble) * Math.max(0, Math.abs(parentState.drag) * 0.13 * (1 + orbMorphSpeeds[0]));
        } else if (Math.abs(parentState.dragTarget) < 0.1) {
          parentState.wobble = 0;
        }
        parentState.dragTarget = approach(parentState.dragTarget, 0, 0.025 + orbMorphSpeeds[0] * 0.4);
      }
      
      // Update parent orb position
      if (parentState && orbMorphDirections[0] !== undefined) {
        const parentMorphT = now * 0.00015; // Much slower morphing
        const parentDrag = parentState.drag;
        const parentAngle = orbMorphDirections[0];
        const parentDx = Math.cos(parentAngle) * parentDrag;
        const parentDy = Math.sin(parentAngle) * parentDrag;
        const scale = orbScaleRef.current || 1;
        
        const { vw, vh } = viewportSizeRef.current;
        
        // Define safe zones based on navbar and orb dimensions
        const navbarHeight = 80;
        const maxOrbitalRadius = 95;
        const totalMaxRadius = maxOrbitalRadius + childRadius + 10;
        
        // Gentler cursor effect
        const mouseX = mousePositionRef.current.x;
        const mouseY = mousePositionRef.current.y;
        const mouseDx = mouseX - parentCenterBaseRef.current.x;
        const mouseDy = mouseY - parentCenterBaseRef.current.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        const maxMouseEffect = 20;
        const mouseEffect = Math.max(0, 1 - mouseDistance / 400) * maxMouseEffect;
        
        // Smoother velocity damping
        parentVelocityRef.current.x *= 0.97;
        parentVelocityRef.current.y *= 0.96;
        
        // Gentler scroll response with bounds checking
        const scrollOffset = Math.max(-50, Math.min(50, scrollPositionRef.current * -0.08));
        
        // Subtle floating motion
        const floatX = Math.sin(now * 0.0001) * 15 + Math.cos(now * 0.00015) * 10;
        const floatY = Math.cos(now * 0.00012) * 10 + Math.sin(now * 0.00008) * 8;
        
        const px = parentCenterBaseRef.current.x + 
                   floatX +
                   (mouseDx / mouseDistance || 0) * mouseEffect +
                   parentVelocityRef.current.x;
        // Calculate parent Y with bounds to prevent navbar overlap
        const baseY = parentCenterBaseRef.current.y;
        const proposedY = baseY + 
                         floatY +
                         (mouseDy / mouseDistance || 0) * mouseEffect +
                         parentVelocityRef.current.y +
                         scrollOffset;
        
        // Keep orb at navbar level
        const safeMinY = navbarHeight - 30; // Allow overlap with navbar
        const safeMaxY = navbarHeight + 60; // Very constrained to top
        const py = Math.min(safeMaxY, Math.max(safeMinY, proposedY));
        
        parentCenterRef.current = { x: px, y: py };

        // Scale parent based on scroll - enlarges when scrolling
        const scrollScale = 1 + Math.abs(scrollVelocityRef.current) * 0.0002;
        const dispersalScale = orbsDispersedRef.current ? 1.2 : 1;
        const parentR = (parentRadius + parentDrag * 0.15) * scale * scrollScale * dispersalScale;
        const parentAmp = (1 + Math.abs(parentDrag) * 0.008) * scale;
        const parentPath = generateSuperSmoothBlob(px + parentDx * scale, py + parentDy * scale, parentR, parentPoints, parentMorphT, parentAmp);
        if (parentOrbRef.current) parentOrbRef.current.setAttribute('d', parentPath);
      }

      // Update child orbs
      if (childrenGroupRef.current && childOrbsRef.current.length === childCount) {
        // Remove group rotation - each child moves independently
        childrenGroupRef.current.style.transform = 'none';
        // Create array with indices for z-sorting
        const childIndices = Array.from({ length: childCount }, (_, i) => i);
        
        // Sort by z-position (back to front)
        childIndices.sort((a, b) => {
          const stateA = orbStatesRef.current[a + 1];
          const stateB = orbStatesRef.current[b + 1];
          return (stateA?.position?.z || 0) - (stateB?.position?.z || 0);
        });
        
        for (let idx = 0; idx < childCount; idx++) {
          const i = childIndices[idx];
          const state = orbStatesRef.current[i + 1];
          if (!state || orbMorphDirections[i+1] === undefined) continue;

          // Minimal physics for child orbs to reduce interference with orbital motion
          state.drag *= 0.95; // Simple damping
          state.dragTarget = 0;

          const fam = getDynamicColorFamily(i, now);
          const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
          const childColor = lerpColor(fam[0], fam[1], tcol);
          const childGradStop0 = svgRef.current.querySelector(`#c${i}s0`);
          const childGradStop1 = svgRef.current.querySelector(`#c${i}s1`);
          if (childGradStop0) childGradStop0.setAttribute("stop-color", childColor);
          if (childGradStop1) childGradStop1.setAttribute("stop-color", lerpColor(fam[1], fam[0], tcol));
          
          // Independent orbital motion for each child
          if (state.orbitalAngle === undefined || isNaN(state.orbitalAngle)) {
            state.orbitalAngle = (i * 2 * Math.PI / childCount);
          }
          // Smooth flowing speed with dynamic variations
          const speed = state.orbitalSpeed || 1;
          state.orbitalAngle += speed * 0.008; // 4x faster but still smooth
          const angle = state.orbitalAngle;
          
          // Add unique orbital wobble and distance variation for each orb
          const wobbleTime = now * 0.0001;
          const radiusVariation = Math.sin(wobbleTime * (state.radiusOscillationSpeed || 0.5) + i * Math.PI) * (state.radiusOscillationAmount || 15);
          const pathWobble = Math.sin(wobbleTime * 1.7 + i) * (state.orbitalWobbleAmount || 0.1);
          
          // No perturbations for stable orbits
          state.orbitalPerturbation.x = 0;
          state.orbitalPerturbation.y = 0;
          state.orbitalPerturbation.z = 0;
          
          const { vw, vh } = viewportSizeRef.current;
          const currentParentR = (parentRadius + (orbStatesRef.current[0]?.drag || 0) * 0.15) * (orbScaleRef.current || 1);
          
          // Dynamic elliptical orbital calculations
          const baseRadius = state.orbitalRadius || 70;
          const r = baseRadius + radiusVariation; // Varying radius
          const e = state.orbitalEccentricity || 0.5;
          
          // Each orb's ellipse rotates at its own unique speed
          const ellipseRotation = wobbleTime * (state.orbitalWobbleSpeed || 0.7) + state.initialAngle;
          
          // Calculate elliptical orbital position with dynamic eccentricity
          const dynamicEccentricity = e + Math.sin(wobbleTime * 0.7 + i * 2) * 0.2;
          const a = r; // Semi-major axis
          const b = r * (1 - dynamicEccentricity * 0.5); // Semi-minor axis varies
          
          // Apply rotation to ellipse
          const baseX = a * Math.cos(angle + pathWobble);
          const baseY = b * Math.sin(angle + pathWobble);
          const orbitalX = baseX * Math.cos(ellipseRotation) - baseY * Math.sin(ellipseRotation);
          const orbitalY = baseX * Math.sin(ellipseRotation) + baseY * Math.cos(ellipseRotation);
          
          // Enhanced 3D motion with vertical oscillation
          const inclination = state.orbitalInclination + Math.sin(wobbleTime * 0.5 + i) * 0.2;
          const verticalOscillation = Math.sin(wobbleTime * 0.8 + i * Math.PI / 2) * 10;
          
          const finalX = orbitalX;
          const finalY = orbitalY * Math.cos(inclination) + verticalOscillation;
          const finalZ = orbitalY * Math.sin(inclination);
          
          // Project 3D to 2D with perspective
          const perspective = 800;
          const scale3D = perspective / (perspective + finalZ);
          
          // Get parent's current position (including any mouse effects from parent orb state)
          const parentState = orbStatesRef.current[0];
          const parentDrag = parentState?.drag || 0;
          const parentDragAngle = orbMorphDirections[0] || 0;
          const parentDx = Math.cos(parentDragAngle) * parentDrag;
          const parentDy = Math.sin(parentDragAngle) * parentDrag;
          const scale = orbScaleRef.current || 1;
          
          const parentX = parentCenterRef.current.x + parentDx * scale;
          const parentY = parentCenterRef.current.y + parentDy * scale;
          
          // Position child relative to parent's actual position using orbital calculations
          const childX = parentX + finalX * scale3D * scale;
          const childY = parentY + finalY * scale3D * scale;
          
          // Store 3D position
          state.position.z = finalZ;
          
          // Remove drag effects for stable orbits
          const dx = 0;
          const dy = 0;
          
          // No collision detection - keep orbits stable
          state.velocity.x = 0;
          state.velocity.y = 0;
          
          // Check collision with parent
          const distToParent = Math.sqrt((childX - parentX) * (childX - parentX) + (childY - parentY) * (childY - parentY));
          const minDistance = (parentRadius + childRadius) * scale * 1.2; // Add some buffer
          
          let bounceX = 0, bounceY = 0;
          if (distToParent < minDistance && distToParent > 0) {
            // Calculate bounce direction (away from parent)
            const pushX = (childX - parentX) / distToParent;
            const pushY = (childY - parentY) / distToParent;
            const pushForce = (minDistance - distToParent) * 0.5;
            bounceX = pushX * pushForce;
            bounceY = pushY * pushForce;
          }
          
          // Handle dispersal/reassembly animations
          let x, y;
          
          if (state.dispersed) {
            // Animate to dispersed position
            state.disperseProgress = Math.min(1, state.disperseProgress + 0.02);
            const t = state.disperseProgress;
            const easeOut = 1 - Math.pow(1 - t, 3);
            x = childX + (state.disperseTarget.x - childX) * easeOut;
            y = childY + (state.disperseTarget.y - childY) * easeOut;
          } else if (state.assembleProgress < 1) {
            // Animate reassembly from below/behind
            state.assembleProgress = Math.min(1, state.assembleProgress + 0.015);
            const t = state.assembleProgress;
            const easeInOut = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            
            // Start from below and behind
            const startX = state.disperseTarget.x || childX;
            const startY = viewportSizeRef.current.vh + 100;
            
            x = startX + (childX - startX) * easeInOut;
            y = startY + (childY - startY) * easeInOut;
          } else {
            // Normal orbital motion - use the calculated orbital position
            x = childX + dx + bounceX;
            y = childY + dy + bounceY;
          }
          
          // Apply depth-based scaling and dimming - children get smaller when scrolling
          const scrollChildScale = 1 - Math.abs(scrollVelocityRef.current) * 0.0001;
          const dispersalChildScale = state.dispersed ? 0.7 : 1;
          const depthScale = scale3D * 0.8 + 0.2; // Keep minimum 20% size
          const depthOpacity = scale3D * 0.7 + 0.3; // Keep minimum 30% opacity
          
          const cR = (childRadius + state.drag * 0.08) * scale * depthScale * scrollChildScale * dispersalChildScale;
          const currentChildAmp = (childAmp + Math.abs(state.drag) * 0.006) * scale * depthScale;
          const morphT = now * 0.0002 + i * 10; // Slower morphing
          
          const childPath = generateSuperSmoothBlob(x, y, cR, childPoints, morphT, currentChildAmp, i);
          
          
          const path = childOrbsRef.current[i];
          if (path) {
            path.setAttribute("d", childPath);
            
            const fadeStart = 40, fadeEnd = 340;
            const fade = Math.min(1, Math.max(0, (fadeEnd - Math.abs(state.dragTarget)) / (fadeEnd - fadeStart)));
            
            if (state.wasVisible === undefined) state.wasVisible = fade > 0.5;

            if (fade < 0.5 && fade > 0.05 && !state.isReturning) {
              const color = lerpColor(fam[0], fam[1], tcol);
              const emission = Math.ceil((0.5 - fade) * 8);
              emitParticles(x, y, color, emission, i, now);
              path.setAttribute("opacity", (fade * 0.95).toFixed(2));
            } else if (state.wasVisible && fade <= 0.05) {
              const color = lerpColor(fam[0], fam[1], tcol);
              emitParticles(x, y, color, 6, i, now);
              path.setAttribute("opacity", "0");
              state.wasVisible = false;
            } else if (!state.wasVisible && fade > 0.05) {
              const color = lerpColor(fam[0], fam[1], tcol);
              emitParticles(x, y, color, 5, i, now);
              path.setAttribute("opacity", (fade * 0.95).toFixed(2));
              state.wasVisible = true;
            } else {
              // Apply depth-based opacity
              path.setAttribute("opacity", (0.95 * depthOpacity).toFixed(2));
            }
            
            // Store position (for future use)
            childPositionsRef.current[i] = { x, y, z: finalZ };
            
            // Check for color matching and create data transmission
            // Get parent color
            const parentStop0 = svgRef.current.querySelector('#p0');
            const parentColor = parentStop0?.getAttribute('stop-color') || '#00E5FF';
            
            // Simple color similarity check (comparing first few characters)
            const colorMatch = childColor.substring(0, 4) === parentColor.substring(0, 4);
            
            // Intermittent transmission (random chance) - reduced frequency with variation
            const timeSinceLastTransmission = now - (lastTransmissionTimeRef.current[i] || 0);
            const minInterval = 6000 + Math.random() * 4000; // 6-10 seconds
            if (timeSinceLastTransmission > minInterval && Math.random() < 0.04) {
              createDataTransmission(i, x, y, parentX, parentY, childColor);
              lastTransmissionTimeRef.current[i] = now;
            }
            
            // Update z-order in DOM
            if (path.parentNode) {
              path.parentNode.appendChild(path);
            }
          }
        }
      }
      
      // Update data transmissions
      updateDataTransmissions();
      
      // Render particles on canvas
      renderCanvas(ctx, now);
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', adjustSVGSize);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (eventTarget) {
        eventTarget.removeEventListener('wheel', handleWheel);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        pointerEvents: "none", // Allows interaction with elements underneath
        touchAction: 'none', // For consistency with HTML
        background: 'transparent', // Ensure background is transparent
        ...sx,
      }}
      style={style}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg 
        ref={svgRef} 
        id="orbSVG"
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop id="p0" offset="0%" stopColor="#00E5FF"/>
            <stop id="p1" offset="100%" stopColor="#5B3CFF"/>
            <stop id="p2" offset="50%" stopColor="#00E5FF"/>
            <stop id="p3" offset="75%" stopColor="#5B3CFF"/>
          </radialGradient>
          <radialGradient id="childGrad0" cx="50%" cy="50%" r="70%">
            <stop id="c0s0" offset="0%" stopColor="#B3D8FF"/>
            <stop id="c0s1" offset="100%" stopColor="#0A192F"/>
          </radialGradient>
          <radialGradient id="childGrad1" cx="50%" cy="50%" r="70%">
            <stop id="c1s0" offset="0%" stopColor="#C6FFD9"/>
            <stop id="c1s1" offset="100%" stopColor="#145A32"/>
          </radialGradient>
          <radialGradient id="childGrad2" cx="50%" cy="50%" r="70%">
            <stop id="c2s0" offset="0%" stopColor="#FFB3C9"/>
            <stop id="c2s1" offset="100%" stopColor="#7B1F3A"/>
          </radialGradient>
          <radialGradient id="childGrad3" cx="50%" cy="50%" r="70%">
            <stop id="c3s0" offset="0%" stopColor="#E0D1FF"/>
            <stop id="c3s1" offset="100%" stopColor="#311B4F"/>
          </radialGradient>
          <radialGradient id="childGrad4" cx="50%" cy="50%" r="70%">
            <stop id="c4s0" offset="0%" stopColor="#FFF5B3"/>
            <stop id="c4s1" offset="100%" stopColor="#4B3800"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="dataGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feColorMatrix in="coloredBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path id="parentOrb" fill="url(#parentGrad)" opacity="0.95"/>
        <g id="dataTransmissions"></g>
        <g id="children"></g>
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG;