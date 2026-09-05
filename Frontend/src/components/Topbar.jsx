import { Box, Button, IconButton, Typography } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useLocation } from 'react-router-dom';
import { menuItems } from './Sidebar';

function Topbar() {
  const location = useLocation();
  const activeMenuItem = menuItems.find(
    ({ path }) => location.pathname === path || (path === '/dashboard' && location.pathname === '/')
  );

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 12,
        zIndex: 1100,
        width: '100%',
        px: 0,
        py: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: 104, md: 112 },
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(14px)',
          borderRadius: '22px',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 10px 36px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 6, md: 8 },
          py: 4,
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT - Bigger fonts */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 40, md: 50 },
              fontWeight: 900,
              color: '#0f1e14',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {activeMenuItem?.label === 'Dashboard'
              ? 'National Dashboard'
              : activeMenuItem?.label || 'National Dashboard'}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 20 },
              fontWeight: 600,
              color: '#5b6b62',
              mt: 0.5,
              letterSpacing: '0.01em',
            }}
          >
            RFCT LARR Act — Real-time Management
          </Typography>
        </Box>

        {/* RIGHT - Bigger buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
          <IconButton
            aria-label="notifications"
            sx={{
              bgcolor: '#ffffff',
              color: '#1e5a4a',
              width: 60,
              height: 65,
              borderRadius: '14px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 3px 10px rgba(0,0,0,0.07)',
              '&:hover': { bgcolor: '#f5f7f0' },
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <Button
            variant="contained"
            sx={{
              bgcolor: '#16633d',
              background: 'linear-gradient(180deg, #219f66 0%, #16633d 100%)',
              color: '#fff',
              borderRadius: 9999,
              px: 3.2,
              minHeight: 48,
              boxShadow: '0 6px 16px rgba(22, 99, 61, 0.3)',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: '-0.01em',
              '&:hover': {
                background: 'linear-gradient(180deg, #26ad71 0%, #134f31 100%)',
              },
            }}
          >
            + New Project
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;