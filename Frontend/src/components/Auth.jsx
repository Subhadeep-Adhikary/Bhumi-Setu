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
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2, py: 4, bgcolor: '#edf3ed' }}>
      <Box sx={{ width: '100%', maxWidth: 520, bgcolor: '#fff', borderRadius: 4, p: { xs: 3, sm: 6 }, boxShadow: '0 24px 70px rgba(31, 70, 43, 0.16)' }}>
        <Box sx={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: '#e4f1df', color: '#17633d', mb: 3 }}>
          <LockOutlinedIcon />
        </Box>
        <Typography component="h1" sx={{ color: '#163a28', fontSize: 36, fontWeight: 800 }}>
          {isRegister ? 'Create your account' : 'Welcome back'}
        </Typography>
        <Typography sx={{ mt: 1, mb: 4, color: '#6a7d70' }}>
          {isRegister ? 'Start managing land acquisition projects securely.' : 'Sign in to continue to your workspace.'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={updateField}
            required
            autoComplete="username"
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={updateField}
            required
            autoComplete={isRegister ? 'new-password' : 'current-password'}
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
            sx={{ mt: 1, minHeight: 54, borderRadius: 2, bgcolor: '#17633d', textTransform: 'none', fontWeight: 800, '&:hover': { bgcolor: '#125231' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Create account' : 'Enter dashboard')}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3, color: '#6a7d70' }}>
          {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}