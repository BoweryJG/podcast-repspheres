import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
  Fade,
  Grow,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';
import { keyframes } from '@mui/system';

const ACCENT_COLOR = '#00ffc6';

// Animation keyframes
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const successPulse = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

// Password strength calculation
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 12.5;
  if (/[^a-zA-Z\d]/.test(password)) strength += 12.5;
  return strength;
};

const getPasswordStrengthColor = (strength) => {
  if (strength < 30) return '#ff4444';
  if (strength < 60) return '#ffaa00';
  if (strength < 80) return '#00aaff';
  return ACCENT_COLOR;
};

const getPasswordStrengthLabel = (strength) => {
  if (strength < 30) return 'Weak';
  if (strength < 60) return 'Fair';
  if (strength < 80) return 'Good';
  return 'Strong';
};

/**
 * Enhanced AuthModal - login or signup form with multiple auth options
 */
export default function AuthModal({ open, onClose, mode = 'login' }) {
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const isLogin = authMode === 'login';
  const isForgotPassword = authMode === 'forgot';
  
  const { 
    signInWithGoogle, 
    signInWithFacebook,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signInWithProvider
  } = useAuth();

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setAuthMode(mode);
      setError('');
      setSuccess(false);
      setEmailSent(false);
    } else {
      // Reset form after close animation
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setRememberMe(false);
        setAgreeToTerms(false);
      }, 300);
    }
  }, [open, mode]);

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    setError('');
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'facebook') {
        await signInWithFacebook();
      } else if (provider === 'apple') {
        await signInWithProvider('apple');
      } else if (provider === 'github') {
        await signInWithProvider('github');
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setEmailSent(true);
      } else if (isLogin) {
        await signInWithEmail(email, password);
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (!agreeToTerms) {
          throw new Error('Please agree to the terms and conditions');
        }
        await signUpWithEmail(email, password, { full_name: name });
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(password);
  const passwordStrengthColor = getPasswordStrengthColor(passwordStrength);
  const passwordStrengthLabel = getPasswordStrengthLabel(passwordStrength);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(20,14,38,0.96)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(123,66,246,0.15)',
          color: '#fff',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontSize: '1.2rem',
        fontWeight: 600
      }}>
        {isForgotPassword ? 'Reset Password' : 
         isLogin ? 'Welcome Back' : 'Create Account'}
        {!loading && (
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            sx={{ 
              color: 'white',
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)'
              } 
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      <DialogContent sx={{ py: 3, px: 3, maxHeight: '70vh', overflowY: 'auto' }}>
      <Box sx={{ mt: 2 }}>
        {/* Success Animation */}
        {success && (
          <Fade in={success}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 4
            }}>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: 80, 
                  color: ACCENT_COLOR,
                  animation: `${successPulse} 0.5s ease-out`
                }} 
              />
              <Typography variant="h6" sx={{ mt: 2, color: ACCENT_COLOR }}>
                {isLogin ? 'Welcome back!' : 'Account created successfully!'}
              </Typography>
            </Box>
          </Fade>
        )}

        {/* Email Sent Confirmation */}
        {emailSent && (
          <Fade in={emailSent}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <EmailIcon sx={{ fontSize: 60, color: ACCENT_COLOR, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Check your email
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                We've sent password reset instructions to {email}
              </Typography>
              <Button
                variant="text"
                onClick={() => setAuthMode('login')}
                sx={{ mt: 3, color: ACCENT_COLOR }}
              >
                Back to login
              </Button>
            </Box>
          </Fade>
        )}

        {/* Main Form */}
        {!success && !emailSent && (
          <Grow in={!success && !emailSent}>
            <Box>
              {/* Error Alert */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ mb: 2 }}
                  icon={<ErrorIcon />}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              )}

              {/* Social Auth Buttons */}
              {!isForgotPassword && (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleSocialAuth('google')}
                      disabled={loading}
                      startIcon={<GoogleIcon />}
                      sx={{
                        backgroundColor: '#fff',
                        color: '#212121',
                        fontWeight: 500,
                        py: 1.2,
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          backgroundColor: '#f1f1f1',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        },
                      }}
                    >
                      Continue with Google
                    </Button>
                    
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleSocialAuth('facebook')}
                        disabled={loading}
                        startIcon={<FacebookIcon />}
                        sx={{
                          backgroundColor: '#1877F2',
                          color: '#fff',
                          fontWeight: 500,
                          py: 1.2,
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            backgroundColor: '#166fe5',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(24,119,242,0.3)'
                          },
                        }}
                      >
                        Facebook
                      </Button>
                      
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleSocialAuth('github')}
                        disabled={loading}
                        startIcon={<GitHubIcon />}
                        sx={{
                          backgroundColor: '#24292e',
                          color: '#fff',
                          fontWeight: 500,
                          py: 1.2,
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            backgroundColor: '#1a1e22',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          },
                        }}
                      >
                        GitHub
                      </Button>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      or continue with email
                    </Typography>
                  </Divider>
                </>
              )}

              {/* Email Auth Form */}
              <Box component="form" onSubmit={handleEmailAuth}>
                {/* Name Field (Sign up only) */}
                {!isLogin && !isForgotPassword && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                {/* Email Field */}
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Field */}
                {!isForgotPassword && (
                  <>
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      sx={{ mb: !isLogin ? 1 : 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255,255,255,0.5)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Password Strength Indicator (Sign up only) */}
                    {!isLogin && password && (
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            Password strength
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ color: passwordStrengthColor, fontWeight: 500 }}
                          >
                            {passwordStrengthLabel}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: passwordStrengthColor,
                              borderRadius: 3,
                            }
                          }}
                        />
                      </Box>
                    )}

                    {/* Confirm Password (Sign up only) */}
                    {!isLogin && (
                      <TextField
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        required
                        error={confirmPassword && password !== confirmPassword}
                        helperText={
                          confirmPassword && password !== confirmPassword 
                            ? 'Passwords do not match' 
                            : ''
                        }
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                sx={{ color: 'rgba(255,255,255,0.5)' }}
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </>
                )}

                {/* Remember Me & Forgot Password (Login only) */}
                {isLogin && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2 
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      }
                      label="Remember me"
                      sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }}
                    />
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setAuthMode('forgot')}
                      sx={{ 
                        color: ACCENT_COLOR,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                )}

                {/* Terms Agreement (Sign up only) */}
                {!isLogin && !isForgotPassword && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{' '}
                        <Link href="/terms" sx={{ color: ACCENT_COLOR }}>
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" sx={{ color: ACCENT_COLOR }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ mb: 3 }}
                  />
                )}

                {/* Submit Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading || (!isLogin && !isForgotPassword && !agreeToTerms)}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: loading 
                      ? 'rgba(255,255,255,0.1)'
                      : `linear-gradient(90deg, ${ACCENT_COLOR} 0%, #7B42F6 100%)`,
                    backgroundSize: '200% 100%',
                    animation: loading ? `${shimmer} 2s linear infinite` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(123, 66, 246, 0.4)',
                    },
                    '&:disabled': {
                      transform: 'none',
                      boxShadow: 'none',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  ) : (
                    isForgotPassword ? 'Send Reset Email' :
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </Button>

                {/* Switch Mode Link */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {isForgotPassword ? (
                      <>
                        Remember your password?{' '}
                        <Link
                          component="button"
                          type="button"
                          onClick={() => setAuthMode('login')}
                          sx={{ 
                            color: ACCENT_COLOR,
                            fontWeight: 500,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Sign in
                        </Link>
                      </>
                    ) : isLogin ? (
                      <>
                        Don't have an account?{' '}
                        <Link
                          component="button"
                          type="button"
                          onClick={() => setAuthMode('signup')}
                          sx={{ 
                            color: ACCENT_COLOR,
                            fontWeight: 500,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Sign up
                        </Link>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <Link
                          component="button"
                          type="button"
                          onClick={() => setAuthMode('login')}
                          sx={{ 
                            color: ACCENT_COLOR,
                            fontWeight: 500,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Sign in
                        </Link>
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grow>
        )}
      </Box>
      </DialogContent>
    </Dialog>
  );
}
