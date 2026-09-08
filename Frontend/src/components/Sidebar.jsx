import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
} from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

import { getCurrentUser } from '../api';

export const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'GIS Map',
    path: '/gis-map',
    icon: LocationOnOutlinedIcon,
  },
  {
    label: 'Statutory Workflow',
    path: '/statutory-workflow',
    icon: DescriptionOutlinedIcon,
  },
  {
    label: 'Compensation Calc',
    path: '/compensation-calc',
    icon: CalculateOutlinedIcon,
  },
  {
    label: 'Documents',
    path: '/documents',
    icon: FolderOpenOutlinedIcon,
  },
  {
    label: 'Smart Alerts',
    path: '/smart-alerts',
    icon: NotificationsNoneOutlinedIcon,
    hasDot: true,
  },
  {
    label: 'AI Decision Support',
    path: '/ai-decision-support',
    icon: AutoAwesomeOutlinedIcon,
  },
];

function Sidebar({ selectedProject }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getCurrentUser();

  const username = user?.username || 'User';
  const initials = username.slice(0, 2).toUpperCase();

  const workflowPaths = [
    '/documents',
    '/statutory-workflow',
    '/compensation-calc',
  ];

  const handleNavigation = (path) => {
    if (workflowPaths.includes(path) && !selectedProject) {
      window.alert('Please select a project');
      return;
    }

    navigate(path);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 430,
        height: '100vh',
        position: 'sticky',
        top: 0,

        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',

        bgcolor: '#ecebe6',

        p: 2,

        boxSizing: 'border-box',

        // Prevent sidebar from shrinking unexpectedly
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 32px)',

          bgcolor: '#f1f8e6',

          borderRadius: '24px',

          border: '1px solid rgba(0,0,0,0.06)',

          boxShadow:
            '0 8px 32px rgba(0,0,0,0.06)',

          px: 2,
          py: 2.2,

          boxSizing: 'border-box',

          display: 'flex',
          flexDirection: 'column',

          // Important for children with long text
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* ========================================================= */}
        {/* LOGO / BRAND */}
        {/* ========================================================= */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',

            gap: 1.2,

            px: 0.5,
            mb: 3,
            mt: 0.5,

            minWidth: 0,
          }}
        >
          {/* Logo */}
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

                fontSize: 21,
                fontWeight: 900,

                letterSpacing: '-0.02em',
              }}
            >
              BS
            </Box>
          </Box>

          {/* Brand text */}
          <Box
            sx={{
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,

                color: '#1d3d2a',

                letterSpacing: '-0.035em',

                lineHeight: 1,

                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Bhoomi-Setu
            </Typography>

            <Typography
              sx={{
                fontSize: 13,

                fontWeight: 700,

                letterSpacing: 1.1,

                color: '#6a8a72',

                textTransform: 'uppercase',

                mt: 0.6,

                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Land Acquisition Platform
            </Typography>
          </Box>
        </Box>

        {/* ========================================================= */}
        {/* MENU TITLE */}
        {/* ========================================================= */}

        <Typography
          sx={{
            px: 1.5,

            mb: 1.2,

            color: '#6b8a6b',

            fontSize: 13,

            fontWeight: 800,

            letterSpacing: 1.8,

            textTransform: 'uppercase',
          }}
        >
          Menu
        </Typography>

        {/* ========================================================= */}
        {/* NAVIGATION */}
        {/* ========================================================= */}

        <Stack
          component="nav"
          aria-label="Main navigation"
          spacing={0.6}
          sx={{
            flexGrow: 1,

            minWidth: 0,
          }}
        >
          {menuItems.map(
            ({ label, path, icon: Icon, hasDot }) => {
              const isActive =
                location.pathname === path ||
                (path === '/dashboard' &&
                  location.pathname === '/');

              return (
                <ButtonBase
                  key={label}
                  onClick={() => handleNavigation(path)}
                  aria-current={
                    isActive ? 'page' : undefined
                  }
                  sx={{
                    width: '100%',

                    minHeight: 56,

                    justifyContent: 'flex-start',

                    borderRadius: '13px',

                    px: 1.5,

                    color: isActive
                      ? '#ffffff'
                      : '#1e3a2a',

                    bgcolor: isActive
                      ? '#16633d'
                      : 'transparent',

                    textAlign: 'left',

                    transition:
                      'background-color 0.2s ease, transform 0.2s ease',

                    minWidth: 0,

                    '&:hover': {
                      bgcolor: isActive
                        ? '#16633d'
                        : '#ddebd0',

                      transform: isActive
                        ? 'none'
                        : 'translateX(2px)',
                    },

                    '&:focus-visible': {
                      outline:
                        '2px solid #0d5d4a',

                      outlineOffset: 2,
                    },
                  }}
                >
                  {/* Icon */}
                  <Icon
                    sx={{
                      fontSize: 26,

                      mr: 1.4,

                      flexShrink: 0,

                      color: isActive
                        ? '#ffffff'
                        : '#2a4a32',
                    }}
                  />

                  {/* Menu label */}
                  <Typography
                    sx={{
                      fontSize: 18,

                      fontWeight: isActive
                        ? 700
                        : 550,

                      letterSpacing:
                        '-0.01em',

                      lineHeight: 1.3,

                      flex: 1,

                      minWidth: 0,

                      overflow: 'hidden',

                      textOverflow:
                        'ellipsis',

                      whiteSpace:
                        'nowrap',
                    }}
                  >
                    {label}
                  </Typography>

                  {/* Notification dot */}
                  {hasDot && (
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius: '50%',

                        bgcolor: '#1fa971',

                        ml: 1,

                        flexShrink: 0,

                        boxShadow:
                          '0 0 0 3px rgba(31,169,113,0.10)',
                      }}
                    />
                  )}
                </ButtonBase>
              );
            }
          )}
        </Stack>

        {/* ========================================================= */}
        {/* USER PROFILE */}
        {/* ========================================================= */}

        <Box
          sx={{
            mt: 2,

            p: 1.2,

            bgcolor: '#eef6e3',

            border:
              '1px solid rgba(0,0,0,0.06)',

            borderRadius: '16px',

            display: 'flex',

            alignItems: 'center',

            gap: 1.2,

            width: '100%',

            boxSizing: 'border-box',

            // CRITICAL:
            // Allows this flex container to shrink
            minWidth: 0,

            overflow: 'hidden',
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 44,
              height: 44,

              flexShrink: 0,

              bgcolor: '#0d5d3f',

              color: '#f4f7f3',

              fontSize: 17,

              fontWeight: 800,

              border: '2px solid #fff',

              boxShadow:
                '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            {initials}
          </Avatar>

          {/* User details */}
          <Box
            sx={{
              flex: 1,

              minWidth: 0,

              overflow: 'hidden',
            }}
          >
            <Typography
              title={username}
              sx={{
                fontSize: 17,

                fontWeight: 700,

                lineHeight: 1.2,

                color: '#163a28',

                // Prevent long email/username
                // from overflowing
                display: 'block',

                width: '100%',

                whiteSpace: 'nowrap',

                overflow: 'hidden',

                textOverflow:
                  'ellipsis',
              }}
            >
              {username}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,

                color: '#5a7a66',

                lineHeight: 1.3,

                mt: 0.35,

                display: 'block',

                width: '100%',

                whiteSpace: 'nowrap',

                overflow: 'hidden',

                textOverflow:
                  'ellipsis',
              }}
            >
              Land Acquisition Officer
            </Typography>
          </Box>

          {/* More menu */}
          <Typography
            aria-hidden="true"
            sx={{
              flexShrink: 0,

              fontSize: 17,

              lineHeight: 1,

              color: '#3a5a46',

              fontWeight: 700,

              px: 0.5,

              letterSpacing: 2,
            }}
          >
            ...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;