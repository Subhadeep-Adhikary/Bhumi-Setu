import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useLocation } from 'react-router-dom';
import { menuItems } from './Sidebar';

function Topbar({ onNewProject }) {
  const location = useLocation();

  const activeMenuItem = menuItems.find(
    ({ path }) =>
      location.pathname === path ||
      (path === '/dashboard' && location.pathname === '/')
  );

  const pageTitle =
    activeMenuItem?.label === 'Dashboard'
      ? 'National Dashboard'
      : activeMenuItem?.label || 'National Dashboard';

  return (
    <Box
      sx={{
        position: 'sticky',
        top: { xs: 8, md: 14 },
        zIndex: 1100,
        width: '100%',
        px: { xs: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          minHeight: { xs: 90, md: 104 },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1.8, md: 2.2 },

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,

          background:
            'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,251,248,0.96))',

          border: '1px solid rgba(22, 99, 61, 0.10)',
          borderRadius: '18px',

          boxShadow:
            '0 8px 30px rgba(20, 55, 38, 0.07), 0 1px 3px rgba(20, 55, 38, 0.05)',

          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',

          transition: 'all 180ms ease',
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Brand / SVG mark */}
          <Box
            sx={{
              width: { xs: 42, md: 48 },
              height: { xs: 42, md: 48 },
              flexShrink: 0,
              borderRadius: '14px',

              display: 'grid',
              placeItems: 'center',

              background:
                'linear-gradient(145deg, #1f8a59 0%, #125536 100%)',

              boxShadow:
                '0 6px 16px rgba(22, 99, 61, 0.22)',
            }}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12.5L16 5L27 12.5V26.5H5V12.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M10 26.5V16H22V26.5"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M13 20H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            {/* Breadcrumb */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                mb: 0.25,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#1f8a59',
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  lineHeight: 1,
                }}
              >
                Bhumi Setu
              </Typography>

              <Typography
                sx={{
                  color: '#a1aaa5',
                  fontSize: 14,
                }}
              >
                /
              </Typography>

              <Typography
                sx={{
                  color: '#7a8780',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Management Portal
              </Typography>
            </Box>

            {/* Page title */}
            <Typography
              sx={{
                fontSize: { xs: 28, sm: 32, md: 36 },
                fontWeight: 850,
                color: '#102219',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',

                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {pageTitle}
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                mt: 0.35,
                fontSize: 13,
                fontWeight: 500,
                color: '#748078',
                letterSpacing: '0.005em',
              }}
            >
              RFCT LARR Act · Real-time Management
            </Typography>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 1.5 },
            flexShrink: 0,
          }}
        >
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              aria-label="notifications"
              sx={{
                width: { xs: 42, md: 46 },
                height: { xs: 42, md: 46 },

                color: '#315d49',
                bgcolor: '#f7faf8',

                border: '1px solid #e5ebe7',
                borderRadius: '13px',

                transition: 'all 180ms ease',

                '&:hover': {
                  bgcolor: '#eef6f1',
                  borderColor: '#cfe1d7',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Box sx={{ position: 'relative', display: 'flex' }}>
                <NotificationsNoneOutlinedIcon
                  sx={{
                    fontSize: { xs: 21, md: 23 },
                  }}
                />

                {/* Notification badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -5,
                    right: -5,

                    width: 8,
                    height: 8,

                    borderRadius: '50%',
                    bgcolor: '#e45b4f',
                    border: '2px solid white',
                  }}
                />
              </Box>
            </IconButton>
          </Tooltip>

          {/* New Project */}
          <Button
            variant="contained"
            onClick={onNewProject}
            startIcon={
              <AddRoundedIcon
                sx={{
                  fontSize: '24px !important',
                }}
              />
            }
            endIcon={
              <KeyboardArrowDownRoundedIcon
                sx={{
                  fontSize: '19px !important',
                  opacity: 0.75,
                  display: { xs: 'none', sm: 'block' },
                }}
              />
            }
            sx={{
                minHeight: { xs: 50, md: 56 },
                px: { xs: 2.6, md: 3.2 },
              borderRadius: '13px',

              bgcolor: '#17643f',
              background:
                'linear-gradient(135deg, #218b59 0%, #17643f 100%)',

              boxShadow:
                '0 6px 16px rgba(23, 100, 63, 0.20)',

              textTransform: 'none',
              fontSize: { xs: 15, md: 18 },
              fontWeight: 800,
              letterSpacing: '-0.01em',

              whiteSpace: 'nowrap',

              transition:
                'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',

              '&:hover': {
                bgcolor: '#125635',
                background:
                  'linear-gradient(135deg, #269b65 0%, #125635 100%)',
                transform: 'translateY(-1px)',
                boxShadow:
                  '0 9px 22px rgba(23, 100, 63, 0.27)',
              },

              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              New Project
            </Box>

            <Box
              component="span"
              sx={{
                display: { xs: 'inline', sm: 'none' },
              }}
            >
              New
            </Box>
          </Button>

          {/* User avatar */}
          <Tooltip title="Account">
            <IconButton
              sx={{
                p: 0.25,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#e5f1ea',
                  color: '#17643f',
                  fontSize: 14,
                  fontWeight: 800,
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                BS
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
