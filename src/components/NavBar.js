import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MemoryIcon from '@mui/icons-material/Memory';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import { useOrbContext } from './OrbContextProvider';
import { useAuth } from '../contexts/AuthContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import InfoModal from './InfoModal';
import AuthModal from './AuthModal';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { keyframes } from '@mui/system';

const ACCENT_COLOR = '#00ffc6';

// Animation keyframes
const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(123, 66, 246, 0.5); }
  50% { box-shadow: 0 0 20px rgba(123, 66, 246, 0.8), 0 0 30px rgba(0, 255, 198, 0.4); }
  100% { box-shadow: 0 0 5px rgba(123, 66, 246, 0.5); }
`;

const borderGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main navigation links
const getNavLinks = (currentUrl, isAdmin) => {
  const links = [
    { 
      key: 'insights',
      label: 'Market Insights', 
      href: 'https://marketdata.repspheres.com/',
      icon: <InsightsIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      highlight: true,
      description: 'Real-time market intelligence'
    },
    { 
      key: 'workspace',
      label: 'Workspace', 
      href: 'https://workspace.repspheres.com/',
      icon: <DashboardIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Unified sales workflows'
    },
    { 
      key: 'sphereos',
      label: 'Sphere OS', 
      href: 'https://crm.repspheres.com/',
      icon: <MemoryIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'AI-powered CRM platform'
    },
    {
      key: 'podcast',
      label: 'Podcast',
      href: 'https://podcast.repspheres.com',
      icon: <PodcastsIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Industry insights & interviews'
    },
  ];

  if (isAdmin) {
    links.push({
      key: 'analytics',
      label: 'Analytics',
      href: '/admin-analytics',
      icon: <InsightsIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Admin dashboard'
    });
  }

  // Show Linguistics link only if not on the linguistics page
  if (!currentUrl.includes('/linguistics')) {
    links.splice(2, 0, {
      key: 'linguistics',
      label: 'Linguistics',
      href: 'https://linguistics.repspheres.com/',
      icon: <LanguageIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Communication optimization'
    });
  }

  // Hide podcast link when already on the podcast page
  if (currentUrl.includes('podcast.repspheres.com')) {
    return links.filter((l) => l.key !== 'podcast');
  }

  return links;
};

// More menu items for additional information
const moreMenuItems = [
  { key: 'about', label: 'About RepSpheres' },
  { key: 'contact', label: 'Contact' },
  { key: 'careers', label: 'Careers' },
  { key: 'legal', label: 'Legal' }
];

// Check if a link is active
const isLinkActive = (href, currentUrl) => {
  if (href.startsWith('http')) {
    return currentUrl.includes(new URL(href).hostname);
  }
  
  // Special case for podcast page
  if (href === 'https://podcast.repspheres.com') {
    return currentUrl.includes('podcast.repspheres.com');
  }
  
  return currentUrl.includes(href);
};

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [authMenuAnchorEl, setAuthMenuAnchorEl] = React.useState(null);
  const [openInfo, setOpenInfo] = React.useState(null); // which info modal is open
  const [openAuth, setOpenAuth] = React.useState(null); // 'login' or 'signup'
  const [navLoading, setNavLoading] = React.useState(false);
  const theme = useTheme();
  // Breakpoints for progressive collapsing of nav links
  const hidePodcast = useMediaQuery('(max-width:1200px)');
  const hideSphereOS = useMediaQuery('(max-width:1100px)');
  const hideLinguistics = useMediaQuery('(max-width:1000px)');
  const hideWorkspace = useMediaQuery('(max-width:900px)');
  const hideInsights = useMediaQuery('(max-width:800px)');
  const isMobile = hideInsights; // all nav links collapsed below 800px
  // Show hamburger menu whenever any link is hidden
  const showMenu = hidePodcast || hideSphereOS || hideLinguistics || hideWorkspace || isMobile;
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  // Extra small breakpoints for very narrow screens
  const isXS = useMediaQuery('(max-width:400px)');
  const isXXS = useMediaQuery('(max-width:320px)');
  
  // Get authentication context
  const { user, loading, signInWithGoogle, signInWithFacebook, signOut, isAdmin } = useAuth();
  
  // Get current URL to determine which page we're on
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Get navigation links based on current page
  const navLinks = getNavLinks(currentUrl, isAdmin);
  
  // Get the gradient colors from context
  const { gradientColors } = useOrbContext();

  // Determine display styles for each nav link based on screen width
  const getLinkStyles = (key) => {
    if (key === 'podcast') {
      return { '@media (max-width:1200px)': { display: 'none' } };
    }
    if (key === 'sphereos') {
      return { '@media (max-width:1100px)': { display: 'none' } };
    }
    if (key === 'linguistics') {
      return { '@media (max-width:1000px)': { display: 'none' } };
    }
    if (key === 'workspace') {
      return { '@media (max-width:900px)': { display: 'none' } };
    }
    if (key === 'insights') {
      return { '@media (max-width:800px)': { display: 'none' } };
    }
    return {};
  };

  // Orb SVG for brand logo with gradient colors
  const orb = (
    <svg width="100%" height="100%" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 0 6px #7B42F6AA)' }}>
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={gradientColors.start} />
          <stop offset="100%" stopColor={gradientColors.end} />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#orbGrad)" opacity="0.85" />
      <circle cx="16" cy="16" r="8" fill="#fff" opacity="0.08" />
    </svg>
  );
  
  // Handle navigation with loading state
  const handleNavigation = (href) => {
    setNavLoading(true);
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };
  
  // Handle drawer toggle with swipe support
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Handle more menu
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Open information modal from more menu or drawer
  const handleInfoOpen = (key) => {
    handleMenuClose();
    setOpenInfo(key);
  };

  const handleInfoClose = () => {
    setOpenInfo(null);
  };

  const handleAuthOpen = (mode) => {
    setOpenAuth(mode);
  };

  const handleAuthClose = () => {
    setOpenAuth(null);
  };
  
  // Handle auth menu
  const handleAuthMenuOpen = (event) => {
    setAuthMenuAnchorEl(event.currentTarget);
  };

  const handleAuthMenuClose = () => {
    setAuthMenuAnchorEl(null);
  };
  
  const handleSignOut = () => {
    signOut();
    handleAuthMenuClose();
  };
  
  // Styles for different button types
  const buttonBaseStyles = {
    fontWeight: 500,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    textTransform: 'none',
    borderRadius: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const navButtonStyles = {
    ...buttonBaseStyles,
    fontSize: { xs: '0.9rem', sm: '0.95rem' },
    px: { xs: 0.5, sm: 1 },
    py: 0.5,
    mx: { xs: 0.5, sm: 1 },
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0%',
      height: '2px',
      background: `linear-gradient(90deg, ${ACCENT_COLOR} 0%, #7B42F6 100%)`,
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      background: 'rgba(255,255,255,0.05)',
      transform: 'translateY(-1px)',
      '&::before': {
        width: '80%',
      },
    },
    '&.active': {
      background: 'rgba(123, 66, 246, 0.1)',
      '&::before': {
        width: '100%',
      },
    },
  };
  
  const googleButtonStyles = {
    ...buttonBaseStyles,
    fontSize: { xs: '0.85rem', sm: '0.9rem' },
    fontWeight: 500,
    px: { xs: 1.2, sm: 1.5 },
    py: 0.5,
    borderRadius: '16px',
    color: '#212121',
    background: '#ffffff',
    '&:hover': {
      background: '#f1f1f1',
      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
      transform: 'scale(1.02)',
    },
    display: 'flex',
    gap: 1,
  };

  const loginButtonStyles = {
    ...buttonBaseStyles,
    fontSize: { xs: '0.85rem', sm: '0.9rem' },
    fontWeight: 500,
    px: { xs: 1.2, sm: 1.5 },
    py: 0.5,
    border: '1px solid #fff',
    borderRadius: '16px',
    color: '#fff',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(255,255,255,0.15)',
      borderColor: ACCENT_COLOR,
      transform: 'scale(1.02)',
      boxShadow: `0 0 15px ${ACCENT_COLOR}40`,
    },
  };

  const signupButtonStyles = {
    ...buttonBaseStyles,
    fontSize: { xs: '0.85rem', sm: '0.9rem' },
    fontWeight: 600,
    px: { xs: 1.2, sm: 1.5 },
    py: 0.5,
    ml: { xs: 0.5, sm: 1 },
    borderRadius: '16px',
    color: '#fff',
    background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
    backgroundSize: '200% 200%',
    animation: `${borderGradient} 3s ease infinite`,
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 20px rgba(123, 66, 246, 0.4)',
    },
  };

  // Adapt button sizes on very small screens
  const loginStyles = {
    ...loginButtonStyles,
    ...(isXS && { fontSize: '0.75rem', px: 0.8 }),
    ...(isXXS && { fontSize: '0.7rem', px: 0.5 }),
  };
  const signupStyles = {
    ...signupButtonStyles,
    ...(isXS && { fontSize: '0.75rem', px: 0.8 }),
    ...(isXXS && { fontSize: '0.7rem', px: 0.5 }),
  };

  // Mobile drawer content
  const drawerContent = (
    <Slide direction="left" in={drawerOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{ 
          width: '260px', 
          p: 2, 
          background: 'rgba(20,14,38,0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '2px solid',
          borderImage: 'linear-gradient(180deg, #7B42F6 0%, #00ffc6 100%) 1',
          height: '100%',
          color: '#fff',
        }}
        role="presentation"
      >
        {/* RepSpheres Logo in Drawer */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4, 
          mt: 2,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }} onClick={() => handleNavigation('https://repspheres.com')}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            mr: 1.5 
          }}>
            {orb}
          </Box>
          <Box sx={{ 
            fontSize: '1.2rem', 
            fontWeight: 800,
            display: 'flex'
          }}>
            <span>Rep</span>
            <Box component="span" sx={{
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Spheres</Box>
          </Box>
        </Box>

        {/* Navigation Links */}
        <List sx={{ mb: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                sx={{
                  py: 1,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: isLinkActive(link.href, currentUrl) ? 'rgba(123, 66, 246, 0.2)' : 'transparent',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </Box>
                <ListItemText 
                  primary={link.label} 
                  secondary={link.description}
                  secondaryTypographyProps={{
                    sx: { 
                      fontSize: '0.75rem', 
                      opacity: 0.7,
                      mt: 0.5
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        {/* More Menu Items */}
        <List>
          {moreMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  setTimeout(() => handleInfoOpen(item.key), 300);
                }}
                sx={{
                  py: 0.75,
                  px: 2,
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                  },
                }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {/* Auth Button */}
        <Box sx={{ mt: 4, px: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={28} sx={{ color: '#fff', opacity: 0.7 }} />
            </Box>
          ) : user ? (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                p: 1,
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.08)',
                }
              }}>
                {user.user_metadata?.avatar_url ? (
                  <Avatar 
                    src={user.user_metadata.avatar_url} 
                    sx={{ width: 40, height: 40, mr: 1.5 }}
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40, mr: 1.5, bgcolor: '#7B42F6' }}>
                    <PersonIcon />
                  </Avatar>
                )}
                <Box sx={{ overflow: 'hidden' }}>
                  <Box sx={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {user.user_metadata?.full_name || 'User'}
                  </Box>
                  <Box sx={{ 
                    fontSize: '0.8rem', 
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {user.email}
                  </Box>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                onClick={signOut}
                startIcon={<LogoutIcon />}
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#fff',
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.02)',
                  }
                }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                fullWidth
                onClick={() => {
                  setDrawerOpen(false);
                  setTimeout(() => handleAuthOpen('login'), 300);
                }}
                variant="outlined"
                sx={{ ...loginStyles, justifyContent: 'center' }}
              >
                Log In
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  setDrawerOpen(false);
                  setTimeout(() => handleAuthOpen('signup'), 300);
                }}
                variant="contained"
                sx={{ ...signupStyles, ml: 0, justifyContent: 'center' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Slide>
  );

  return (
    <>
      {/* Loading Progress Bar */}
      {navLoading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
          zIndex: 9999,
          animation: 'loading 1s ease-in-out infinite',
          '@keyframes loading': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          }
        }} />
      )}
      
      <AppBar position="sticky" elevation={0} sx={{
        background: 'rgba(24,24,43,0.52)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 6px 24px 0 rgba(123,66,246,0.15)',
        border: '1px solid rgba(123,66,246,0.13)',
        borderBottom: '1px solid rgba(123,66,246,0.10)',
        borderRadius: { xs: '0 0 16px 16px', md: '0 0 24px 24px' },
        mx: 'auto',
        mt: { xs: 0.5, md: 1 },
        width: { xs: 'calc(100% - 10px)', sm: 'calc(100% - 20px)', md: 'calc(100% - 40px)' },
        maxWidth: '1800px',
        overflow: 'hidden',
        zIndex: 1200,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(123,66,246,0.25)',
        },
      }}>
        <Toolbar sx={{ 
          px: { xs: 1, sm: 2 },
          height: { xs: '60px', sm: '64px' },
          minHeight: { xs: '60px', sm: '64px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo Section */}
          <Box 
            component="a" 
            href="https://repspheres.com" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('https://repspheres.com');
            }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 }
            }}>
              {orb}
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              fontWeight: 800,
              letterSpacing: '0.03em',
            }}>
              <Box component="span">Rep</Box>
              <Box component="span" sx={{
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Spheres</Box>
            </Box>
          </Box>

          {/* Middle Section - Navigation (only on desktop) */}
          {!isMobile && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                px: { sm: 1, md: 2 },
                maxWidth: { sm: '65vw', md: '70vw' },
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}>
                {navLinks.map((link) => (
                  <Tooltip 
                    key={link.key}
                    title={link.description}
                    arrow
                    placement="bottom"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <Button
                      component="a"
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href);
                      }}
                      className={isLinkActive(link.href, currentUrl) ? 'active' : ''}
                      sx={{
                        ...navButtonStyles,
                        ...getLinkStyles(link.key),
                        '& .buttonText': {
                          display: { xs: 'none', sm: 'inline' }
                        }
                      }}
                    >
                      <Box sx={{ 
                        mr: { xs: 0, sm: 1 },
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {link.icon}
                      </Box>
                      <Box component="span" className="buttonText">{link.label}</Box>
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          )}

          {/* Right Section - Auth Buttons & Menu Button */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto',
            gap: { xs: 0.5, sm: 1 },
          }}>
            
            {/* Auth Button or User Profile */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              {loading ? (
                <CircularProgress size={24} color="inherit" sx={{ opacity: 0.7 }} />
              ) : user ? (
                <Tooltip title="Account menu" arrow>
                  <IconButton
                    onClick={handleAuthMenuOpen}
                    size="small"
                    sx={{
                      ml: 0.5,
                      border: '1px solid rgba(255,255,255,0.2)',
                      p: 0.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: ACCENT_COLOR,
                        transform: 'scale(1.1)',
                        boxShadow: `0 0 15px ${ACCENT_COLOR}40`,
                      }
                    }}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <Avatar
                        src={user.user_metadata.avatar_url}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <PersonIcon sx={{ color: '#fff' }} />
                    )}
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Button
                    onClick={() => handleAuthOpen('login')}
                    variant="outlined"
                    sx={loginStyles}
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => handleAuthOpen('signup')}
                    variant="contained"
                    sx={signupStyles}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>


            {/* More Menu Button (Desktop) */}
            {!isMobile && (
              <Tooltip title="More options" arrow>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ 
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: ACCENT_COLOR,
                      transform: 'rotate(90deg) scale(1.1)',
                    }
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Hamburger Menu Button (Mobile) */}
            {showMenu && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  display: { xs: 'flex' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: ACCENT_COLOR,
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* More Menu (Desktop) */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            background: 'rgba(30,20,55,0.95)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(123,66,246,0.2)',
            color: '#fff',
            minWidth: '200px',
          }
        }}
      >
        {moreMenuItems.map((item) => (
          <MenuItem 
            key={item.key} 
            onClick={() => handleInfoOpen(item.key)}
            sx={{
              py: 1.2,
              px: 2,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(123,66,246,0.2)',
                color: ACCENT_COLOR,
              }
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
      
      {/* Auth Menu */}
      <Menu
        anchorEl={authMenuAnchorEl}
        open={Boolean(authMenuAnchorEl)}
        onClose={handleAuthMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            background: 'rgba(30,20,55,0.95)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(123,66,246,0.2)',
            color: '#fff',
            minWidth: '220px',
            p: 1,
          }
        }}
      >
        {user && (
          <Box sx={{ p: 1, mb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user.user_metadata?.full_name || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {user.email}
            </Typography>
          </Box>
        )}
        <MenuItem 
          onClick={handleSignOut}
          sx={{
            py: 1.2,
            px: 2,
            fontSize: '0.95rem',
            color: '#ff7979',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(255,121,121,0.15)',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LogoutIcon fontSize="small" />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Info Modals */}
      {moreMenuItems.map(item => (
        <InfoModal 
          key={item.key}
          open={openInfo === item.key} 
          onClose={handleInfoClose} 
          title={item.label}
        >
          <Typography>Content for {item.label} goes here.</Typography>
        </InfoModal>
      ))}

      {/* Auth Modal */}
      <AuthModal 
        open={openAuth !== null} 
        onClose={handleAuthClose} 
        initialMode={openAuth || 'login'}
      />
    </>
  );
}
