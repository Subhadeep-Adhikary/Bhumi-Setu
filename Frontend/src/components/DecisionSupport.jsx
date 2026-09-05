import { Box, Stack, Typography } from '@mui/material';

const riskCards = [
  { project: 'P001', state: 'Madhya Pradesh', score: 51, color: '#ee584a' },
  { project: 'P002', state: 'Rajasthan', score: 82, color: '#ef4e3d' },
  { project: 'P003', state: 'Karnataka', score: 18, color: '#f1b052' },
  { project: 'P004', state: 'Andhra Pradesh', score: 82, color: '#ef4e3d' },
  { project: 'P005', state: 'Maharashtra', score: 51, color: '#f3c05d' },
];

const delayCards = [
  { project: 'DFC Phase 3', reason: 'Pending objections', delay: '+75d', color: '#f6bf66' },
  { project: 'Polavaram Canal', reason: 'Court dispute', delay: '+99d', color: '#ef5d4d' },
  { project: 'NH-44 Nagpur', reason: 'Minor land records pending', delay: '+15d', color: '#f5c471' },
  { project: 'Pune-Mumbai', reason: 'Early stage, risk management', delay: '+3d', color: '#f5d08d' },
];

const actions = [
  {
    text: 'Schedule 5/19 hearing for DFC Phase 3',
    meta: 'overdue 47 days • P002',
    tag: 'High priority',
    tagColor: '#f3d8d7',
    tagText: '#d94b4b',
  },
  {
    text: 'Release compensation to 214 landowners',
    meta: 'Pending',
    tag: 'Pending',
    tagColor: '#edf1f6',
    tagText: '#546d7a',
  },
  {
    text: 'Re-verify mismatched Khatian 8814',
    meta: 'Reviewed',
    tag: 'Reviewed',
    tagColor: '#f4e7ca',
    tagText: '#9a6d12',
  },
  {
    text: 'Initiate R&R rehabilitation',
    meta: 'Action required',
    tag: 'Action required',
    tagColor: '#edf4eb',
    tagText: '#35655a',
  },
  {
    text: 'Update GIS corridor',
    meta: 'Pune-Mumbai alignment update',
    tag: 'Update',
    tagColor: '#e9f1f6',
    tagText: '#3a678a',
  },
];

function DecisionSupport() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 980,
        bgcolor: '#edf1eb',
        borderRadius: 3,
        p: 2.8,
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#183f35' }}>AI Decision Support</Typography>
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

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, bgcolor: '#f5f7f4', borderRadius: 3, p: 2.2, border: '1px solid rgba(48,95,74,0.08)' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#183f35', mb: 1.5 }}>Project Risk Indicators</Typography>

          <Stack spacing={1.3}>
            {riskCards.map((item) => (
              <Box key={item.project} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: '#f2f5f3', border: '1px solid rgba(34,89,70,0.2)', display: 'grid', placeItems: 'center' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                </Box>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1d473d', minWidth: 52 }}>{item.project}</Typography>
                <Typography sx={{ fontSize: 14, color: '#3b675e', flex: 1 }}>{item.state}</Typography>
                <Box sx={{ flex: 1, height: 10, borderRadius: 999, bgcolor: '#e7efe9', overflow: 'hidden' }}>
                  <Box sx={{ width: `${item.score}%`, height: '100%', borderRadius: 999, bgcolor: item.color }} />
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#183f35', minWidth: 26, textAlign: 'right' }}>{item.score}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, bgcolor: '#f5f7f4', borderRadius: 3, p: 2.2, border: '1px solid rgba(48,95,74,0.08)' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#183f35', mb: 1.5 }}>Delay Prediction</Typography>

          <Stack spacing={1.4}>
            {delayCards.map((item) => (
              <Box key={item.project} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.2 }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#183f35' }}>{item.project}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#4f7867', mt: 0.25 }}>{item.reason}</Typography>
                </Box>
                <Box sx={{ bgcolor: item.color, color: '#fff', borderRadius: 1.5, px: 1.2, py: 0.5, fontSize: 12, fontWeight: 800 }}>
                  {item.delay}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, bgcolor: '#f5f7f4', borderRadius: 3, p: 2.2, border: '1px solid rgba(48,95,74,0.08)' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#183f35', mb: 1.5 }}>AI Priority Actions</Typography>

          <Stack spacing={1.3}>
            {actions.map((action, index) => (
              <Box key={`${action.text}-${index}`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: '#dfeeee', color: '#1f6050', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, mt: 0.2 }}>
                  {index + 1}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#183f35', lineHeight: 1.35 }}>{action.text}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#4f7867', mt: 0.2 }}>{action.meta}</Typography>
                </Box>
                <Box sx={{ bgcolor: action.tagColor, color: action.tagText, borderRadius: 1.5, px: 1, py: 0.5, fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {action.tag}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default DecisionSupport;
