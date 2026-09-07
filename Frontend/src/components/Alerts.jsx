import { Box, Stack, Typography } from '@mui/material';

const alertCategories = ['All', 'Breach', 'Stall', 'Document', 'Escalation', 'Info'];

const alerts = [
  {
    type: 'Breach',
    title: 'Statutory Deadline Missed',
    detail: 'Sec 19 Declaration overdue • 47 days • DFC Phase 3 Rajasthan • 2 hours ago',
    project: 'P002',
    color: '#f5dada',
    icon: '!',
    iconColor: '#ef4b4b',
  },
  {
    type: 'Stall',
    title: 'Case Stalled',
    detail: 'No activity • Polavaram Canal • 63 days • 1 day ago',
    project: 'P002',
    color: '#faebc3',
    icon: '◔',
    iconColor: '#e7a11a',
  },
  {
    type: 'Document',
    title: 'Document Mismatch',
    detail: 'OCR mismatch • Khatiyan KH-2341 • 3 hours ago',
    project: 'P002',
    color: '#f6dfce',
    icon: '▣',
    iconColor: '#e67e22',
  },
  {
    type: 'Escalation',
    title: 'Escalation Triggered',
    detail: 'Compensation pending • >90 days • 214 landowners • 5 hours ago',
    project: 'P002',
    color: '#f7d8d8',
    icon: '!',
    iconColor: '#e14a4a',
  },
];

function Alerts() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#eef2ed',
        p: { xs: 2.5, md: 4 },
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" spacing={1.2} sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1.2 }}>
        {alertCategories.map((category) => {
          const active = category === 'All';
          return (
            <Box
              key={category}
              sx={{
                bgcolor: active ? '#3b82f6' : '#e5e9e3',
                color: active ? '#fff' : '#222',
                borderRadius: '24px',
                px: 3,
                py: 1.1,
                fontSize: '18px',
                fontWeight: active ? 800 : 600,
                cursor: 'pointer',
              }}
            >
              {category}
            </Box>
          );
        })}
      </Stack>

      <Stack spacing={2.2}>
        {alerts.map((alert) => (
          <Box
            key={alert.title}
            sx={{
              width: '100%',
              bgcolor: '#fdfbf6',
              borderRadius: '16px',
              p: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: alert.color,
                color: alert.iconColor,
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {alert.icon}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '22px', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>
                {alert.title}
              </Typography>
              <Typography sx={{ fontSize: '17px', color: '#444', fontWeight: 500, mt: 0.6, lineHeight: 1.4 }}>
                {alert.detail}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0, ml: 2 }}>
              <Box
                sx={{
                  bgcolor: '#f3e9d5',
                  borderRadius: '10px',
                  px: 2,
                  py: 0.8,
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#5a4a2a',
                }}
              >
                {alert.project} • View
              </Box>
              <Box
                sx={{
                  bgcolor: '#fde8e8',
                  color: '#c53030',
                  borderRadius: '10px',
                  px: 2.2,
                  py: 0.8,
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Escalate →
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Alerts;
