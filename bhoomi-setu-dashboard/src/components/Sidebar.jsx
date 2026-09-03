import { Avatar, Box, ButtonBase, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '◫' },
  { label: 'GIS Map', path: '/gis-map', icon: '⌖' },
  { label: 'Statutory Workflow', path: '/statutory-workflow', icon: '▣' },
  { label: 'Compensation Calc', path: '/compensation-calc', icon: '₹' },
  { label: 'Documents', path: '/documents', icon: '▤' },
  { label: 'Smart Alerts', path: '/smart-alerts', icon: '◌' },
  { label: 'AI Decision Support', path: '/ai-decision-support', icon: '✦' },
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
        width: 340,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#e7e7e3',
        p: 2.5,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: 820,
          bgcolor: '#dfe8d8',
          borderRadius: 4,
          px: 2.5,
          py: 2.8,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          color: '#1d4d3d',
        }}
      >
        <Stack direction="row" spacing={1.6} alignItems="center" sx={{ mb: 2.5, pl: 0.5 }}>
          <Box
            sx={{
              width: 74,
              height: 74,
              borderRadius: '50%',
              bgcolor: '#0d5d4a',
              color: '#f7f7f0',
              display: 'grid',
              placeItems: 'center',
              fontSize: 32,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.06em',
            }}
          >
            BS
          </Box>

          <Box>
            <Typography sx={{ fontSize: 34, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.05em' }}>
              Bhoomi-Setu
            </Typography>
            <Typography
              sx={{
                mt: 0.55,
                fontSize: 14,
                letterSpacing: 1.6,
                color: '#2c5f4d',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Land Acquisition Platform
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            px: 0.8,
            mb: 1.2,
            color: '#285c4d',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          Menu
        </Typography>

        <Stack component="nav" aria-label="Main navigation" spacing={0.9}>
          {menuItems.map(({ label, path, icon }) => {
            const isActive = location.pathname === path || (path === '/dashboard' && location.pathname === '/');

            return (
              <ButtonBase
                key={label}
                onClick={() => handleNavigation(path)}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  minHeight: 48,
                  justifyContent: 'flex-start',
                  borderRadius: 2.2,
                  px: 1.2,
                  color: '#173f33',
                  bgcolor: isActive ? '#a4c7a8' : 'transparent',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: isActive ? '#a4c7a8' : '#d7e4d4' },
                  '&:focus-visible': { outline: '2px solid #0d5d4a', outlineOffset: 2 },
                }}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    width: 30,
                    fontSize: 26,
                    lineHeight: 1,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    mr: 1.4,
                    color: '#0f4d3d',
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 19,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.15,
                    color: '#173f33',
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
            mt: 2,
            borderTop: '1px solid rgba(34, 93, 72, 0.12)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
            <Avatar
              sx={{
                width: 52,
                height: 52,
                bgcolor: '#0f5a48',
                color: '#f4f7f3',
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              AK
            </Avatar>

            <Box>
              <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                Ankit Kumar
              </Typography>
              <Typography sx={{ fontSize: 15, color: '#2d5f4f', letterSpacing: '-0.02em' }}>
                District Collector - MP
              </Typography>
            </Box>
          </Box>

          <Typography aria-hidden="true" sx={{ fontSize: 30, lineHeight: 1, color: '#1b4e3f', mt: -0.8 }}>
            ⋯
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
