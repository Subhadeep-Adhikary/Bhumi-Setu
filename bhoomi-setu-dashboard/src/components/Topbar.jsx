import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

function Topbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#f8faf8', // exact light bg from image
        color: '#12201c',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT - Title like image */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 22, md: 26 },
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            National Dashboard
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 13 },
              fontWeight: 500,
              color: '#5b6b62',
              mt: 0.2,
            }}
          >
            RFCT LARR Act — Real-time Management
          </Typography>
        </Box>

        {/* RIGHT - Bell + New Project like image */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            aria-label="notifications"
            sx={{
              bgcolor: '#ffffff',
              color: '#1e5a4a',
              width: 44,
              height: 44,
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
              '&:hover': { bgcolor: '#ffffff' },
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <Button
            variant="contained"
            sx={{
              bgcolor: '#128152',
              background: 'linear-gradient(180deg, #1a9d68 0%, #117a4e 100%)',
              color: '#fff',
              borderRadius: 9999,
              px: 2.5,
              minHeight: 44,
              boxShadow: '0 2px 8px rgba(17, 122, 78, 0.25)',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 15,
              '&:hover': {
                background: 'linear-gradient(180deg, #1a9d68 0%, #0e6a43 100%)',
              },
            }}
          >
            + New Project
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;