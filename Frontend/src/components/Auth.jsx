import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../api';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === '/register';
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authenticate(isRegister ? 'register' : 'login', form);
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Unable to reach the server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#ecebe6' }}>
      
      {/* LEFT SIDE - Attractive Background */}
      <Box sx={{ 
        flex: 1, 
        display: { xs: 'none', md: 'flex' }, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 6,
        background: 'linear-gradient(135deg, #0f2a1e 0%, #17633d 50%, #14b47e 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.07)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, right: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(20,180,126,0.25)' }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 46, height: 46, borderRadius: 2, overflow: 'hidden', display: 'grid', placeItems: 'center', bgcolor: '#ffffff', boxShadow: '0 8px 18px rgba(0,0,0,0.12)' }}>
              <Box component="img" src="/logo.svg" alt="Bhoomi-Setu logo" sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
            </Box>
            <Typography sx={{ fontWeight: 900, fontSize: 20, letterSpacing: 0.5 }}>Bhoomi-Setu</Typography>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontSize: 44, fontWeight: 900, lineHeight: 1.1, mb: 2 }}>
            Land Acquisition<br/>Platform
          </Typography>
          <Typography sx={{ fontSize: 16, color: '#c8e6d5', lineHeight: 1.6, maxWidth: 400 }}>
            Streamline your land acquisition workflow. Track projects, manage compensation under Sec. 77, and monitor state-wise progress securely.
          </Typography>

          <Box sx={{ mt: 5, display: 'grid', gap: 2 }}>
            {[
              '✓ State-wise Acquisition Snapshot',
              '✓ Document Verification System'
            ].map(text => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(255,255,255,0.1)', p: 1.5, borderRadius: 3, backdropFilter: 'blur(10px)' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography sx={{ position: 'relative', zIndex: 1, fontSize: 12, color: '#8abda3' }}>
          © 2026 Land Acquisition Management System. All rights reserved.
        </Typography>
      </Box>

      {/* RIGHT SIDE - Login Details */}
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center', px: 2, py: 4, bgcolor: '#ffffff' }}>
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          <Box sx={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: '#e4f1df', color: '#17633d', mb: 3 }}>
            <LockOutlinedIcon />
          </Box>
          <Typography component="h1" sx={{ color: '#163a28', fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>
            {isRegister ? 'Create your account' : 'Welcome back'}
          </Typography>
          <Typography sx={{ mt: 1, mb: 4, color: '#6a7d70', fontSize: 15 }}>
            {isRegister ? 'Start managing land acquisition projects securely.' : 'Sign in to continue to your workspace.'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.2 }}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={updateField}
              required
              autoComplete="username"
              autoFocus
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, minHeight: 56 } }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={updateField}
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, minHeight: 56 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((visible) => !visible)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={!loading && <ArrowForwardRoundedIcon />}
              sx={{ mt: 1, minHeight: 56, borderRadius: 2, bgcolor: '#17633d', textTransform: 'none', fontWeight: 800, fontSize: 16, '&:hover': { bgcolor: '#125231' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Create account' : 'Enter dashboard')}
            </Button>
          </Box>

          <Typography align="center" sx={{ mt: 3, color: '#6a7d70', fontSize: 14 }}>
            {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
            <Link to={isRegister ? '/login' : '/register'} style={{ color: '#17633d', fontWeight: 800, textDecoration: 'none' }}>
              {isRegister ? 'Login' : 'Register'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}