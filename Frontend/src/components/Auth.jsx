import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
    <Box className="auth-page">
      <Paper elevation={0} className="auth-card">
        <Typography variant="overline" color="primary" fontWeight={700}>
          Bhumi Setu
        </Typography>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          {isRegister ? 'Create your account' : 'Welcome back'}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {isRegister ? 'Start managing land acquisition projects securely.' : 'Sign in to continue to your workspace.'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
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
            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Register' : 'Login')}
            </Button>
          </Stack>
        </Box>

        <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
          {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}