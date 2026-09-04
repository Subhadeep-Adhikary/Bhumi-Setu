import { Avatar, Box, ButtonBase, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'GIS Map', path: '/gis-map', icon: LocationOnOutlinedIcon },
  { label: 'Statutory Workflow', path: '/statutory-workflow', icon: DescriptionOutlinedIcon },
  { label: 'Compensation Calc', path: '/compensation-calc', icon: CalculateOutlinedIcon },
  { label: 'Documents', path: '/documents', icon: FolderOpenOutlinedIcon },
  { label: 'Landowner Portal', path: '/landowner-portal', icon: PersonOutlineOutlinedIcon },
  { label: 'Smart Alerts', path: '/smart-alerts', icon: NotificationsNoneOutlinedIcon, hasDot: true },
  { label: 'AI Decision Support', path: '/ai-decision-support', icon: AutoAwesomeOutlinedIcon },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 430,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: '#ecebe6',
        p: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 32px)',
          bgcolor: '#f1f8e6',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          px: 2,
          py: 2.2,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* PURE CSS LOGO - Like your screenshot */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 0.5, mb: 2.8, mt: 0.5 }}>
          <Box
            sx={{
              width: 55,
              height: 55,
              borderRadius: '14px',
              bgcolor: '#c5dfb8',
              display: 'grid',
              placeItems: 'center',
              p: '4px',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                bgcolor: '#17633d',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                fontSize: 25,
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
            >
              BS
            </Box>
          </Box>
          <Box sx={{ lineHeight: 1 }}>
            <Typography
              sx={{
                fontSize: 35,
                fontWeight: 800,
                color: '#1d3d2a',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              Bhoomi-Setu
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.1,
                color: '#6a8a72',
                textTransform: 'uppercase',
                mt: 0.4,
              }}
            >
              Land Acquisition Platform
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            px: 1.5,
            mb: 1.2,
            color: '#6b8a6b',
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
          }}
        >
          Menu
        </Typography>

        <Stack component="nav" aria-label="Main navigation" spacing={0.6} sx={{ flexGrow: 1 }}>
          {menuItems.map(({ label, path, icon: Icon, hasDot }) => {
            const isActive = location.pathname === path || (path === '/dashboard' && location.pathname === '/');

            return (
              <ButtonBase
                key={label}
                onClick={() => handleNavigation(path)}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  width: '100%',
                  minHeight: 44,
                  justifyContent: 'flex-start',
                  borderRadius: '12px',
                  px: 1.6,
                  color: isActive ? '#ffffff' : '#1e3a2a',
                  bgcolor: isActive ? '#16633d' : 'transparent',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: isActive ? '#16633d' : '#ddebd0' },
                  '&:focus-visible': { outline: '2px solid #0d5d4a', outlineOffset: 2 },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 25,
                    mr: 1.4,
                    color: isActive ? '#ffffff' : '#2a4a32',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '-0.01em',
                    lineHeight: 2.5,
                    flex: 1,
                  }}
                >
                  {label}
                </Typography>
                {hasDot && (
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1fa971', ml: 1 }} />
                )}
              </ButtonBase>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
            p: 1.2,
            bgcolor: '#eef6e3',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#0d5d3f',
                color: '#f4f7f3',
                fontSize: 20,
                fontWeight: 800,
                border: '2px solid #fff',
              }}
            >
              AK
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: '#163a28' }}>
                Ankit Kumar
              </Typography>
              <Typography sx={{ fontSize: 20, color: '#5a7a66', letterSpacing: '-0.01em', mt: 0.2 }}>
                District Collector - MP
              </Typography>
            </Box>
          </Box>
          <Typography aria-hidden="true" sx={{ fontSize: 18, lineHeight: 1, color: '#3a5a46', fontWeight: 700, pr: 0.5, letterSpacing: 2 }}>
            ...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;