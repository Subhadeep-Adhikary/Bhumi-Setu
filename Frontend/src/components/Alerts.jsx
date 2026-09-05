import { Box, Button, Stack, Typography } from '@mui/material';

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
        maxWidth: 980,
        bgcolor: '#eef2ed',
        borderRadius: 3,
        p: 2.8,
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#183f35' }}>Smart Alerts &amp; Timeline Tracker</Typography>
          <Typography sx={{ fontSize: 16, color: '#4f7867', fontWeight: 500 }}>
            RFCTLARR Act — Real-time Management
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: '#dfece1',
            borderRadius: 2,
            color: '#1a5e4c',
            px: 1.6,
            py: 0.8,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          + New Project
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.2} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
        {alertCategories.map((category) => {
          const isActive = category === 'All';
          return (
            <Box
              key={category}
              sx={{
                bgcolor: isActive ? '#dfeafc' : '#edf1ee',
                color: isActive ? '#1c4d7a' : '#355d4d',
                border: isActive ? '1px solid rgba(57,105,161,0.18)' : '1px solid rgba(52,86,69,0.08)',
                borderRadius: 2,
                px: 1.7,
                py: 0.8,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {category}
            </Box>
          );
        })}
      </Stack>

      <Stack spacing={1.8}>
        {alerts.map((alert) => (
          <Box
            key={alert.title}
            sx={{
              bgcolor: '#f4f6f2',
              borderRadius: 3,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: '1px solid rgba(58,93,74,0.08)',
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                bgcolor: alert.color,
                color: alert.iconColor,
                display: 'grid',
                placeItems: 'center',
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              {alert.icon}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#183f35', mb: 0.2 }}>
                {alert.title}
              </Typography>
              <Typography sx={{ fontSize: 15, color: '#4e7867', fontWeight: 500 }}>
                {alert.detail}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
              <Box
                sx={{
                  bgcolor: '#edf0ee',
                  borderRadius: 2,
                  color: '#1a4239',
                  px: 1.5,
                  py: 0.8,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {alert.project} • View
              </Box>

              <Button
                sx={{
                  bgcolor: '#f2d7d7',
                  color: '#d64a4a',
                  borderRadius: 2,
                  px: 1.8,
                  py: 0.7,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#efd5d5' },
                }}
              >
                Escalate →
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Alerts;
