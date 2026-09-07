import { Box, Stack, Typography } from '@mui/material';

const riskCards = [
  { project: 'P001', state: 'Madhya Pradesh', score: 51, color: '#ef5a4c' },
  { project: 'P002', state: 'Rajasthan', score: 82, color: '#ef4e3d' },
  { project: 'P003', state: 'Karnataka', score: 18, color: '#f5b73a' },
  { project: 'P004', state: 'Andhra Pradesh', score: 82, color: '#ef4e3d' },
  { project: 'P005', state: 'Maharashtra', score: 51, color: '#f7b84e' },
];

const delayCards = [
  { project: 'DFC Phase 3', reason: 'Pending objections', delay: '+75d', bg: '#f4b65a' },
  { project: 'Polavaram Canal', reason: 'Court dispute', delay: '+99d', bg: '#e74c3c' },
  { project: 'NH-44 Nagpur', reason: 'Minor land records pending', delay: '+15d', bg: '#f5b65e' },
  { project: 'Pune-Mumbai', reason: 'Early stage, risk management', delay: '+3d', bg: '#27ae60' },
];

const actions = [
  { text: 'Schedule Sec 19 hearing for DFC Phase 3', meta: 'overdue 47 days • P002', tag: 'High priority', tagBg: '#fde2e2', tagColor: '#c0392b' },
  { text: 'Release compensation to 214 landowners', meta: '', tag: 'Pending', tagBg: '#fff0b3', tagColor: '#7a5a00' },
  { text: 'Re-verify mismatched Khatiyan 8814', meta: '', tag: 'Review needed', tagBg: '#fff0b3', tagColor: '#7a5a00' },
  { text: 'Initiate R&R rehabilitation', meta: '', tag: 'Action required', tagBg: '#ffe4c2', tagColor: '#8a4a00' },
  { text: 'Update GIS corridor', meta: 'Pune-Mumbai alignment update', tag: '', tagBg: '', tagColor: '' },
];

function DecisionSupport() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#eef1eb', p: 3, boxSizing: 'border-box' }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.5} sx={{ width: '100%', alignItems: 'stretch' }}>
        <Box sx={{ flex: 1, minHeight: 640, bgcolor: '#fdfbf6', borderRadius: '18px', p: 3, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#111', mb: 3 }}>Project Risk Indicators</Typography>
          <Stack spacing={3.2}>
            {riskCards.map((item) => (
              <Box key={item.project}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: '#f1f1f1', display: 'grid', placeItems: 'center', fontSize: 18 }}>🛡️</Box>
                    <Box>
                      <Typography sx={{ fontSize: '22px', fontWeight: 800, color: '#111', lineHeight: 1 }}>{item.project}</Typography>
                      <Typography sx={{ fontSize: '17px', color: '#444', mt: 0.3, fontWeight: 600 }}>{item.state}</Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: '22px', fontWeight: 900 }}>{item.score}</Typography>
                </Stack>
                <Box sx={{ mt: 1.2, ml: 5.5, width: 'calc(100% - 44px)', height: 10, bgcolor: '#eee', borderRadius: 999 }}>
                  <Box sx={{ width: `${item.score}%`, height: '100%', bgcolor: item.color, borderRadius: 999 }} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 640, bgcolor: '#fdfbf6', borderRadius: '18px', p: 3, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#111', mb: 3 }}>Delay Prediction</Typography>
          <Stack spacing={2.5}>
            {delayCards.map((item) => (
              <Box key={item.project} sx={{ bgcolor: '#fff', border: '1px solid #efefef', borderRadius: '14px', p: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 76 }}>
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: 800, color: '#111' }}>{item.project}</Typography>
                  <Typography sx={{ fontSize: '16px', color: '#666', mt: 0.5, fontWeight: 500 }}>{item.reason}</Typography>
                </Box>
                <Box sx={{ bgcolor: item.bg, color: '#fff', px: 1.8, py: 0.8, borderRadius: '10px', fontSize: '19px', fontWeight: 800, minWidth: 58, textAlign: 'center' }}>{item.delay}</Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 640, bgcolor: '#fdfbf6', borderRadius: '18px', p: 3, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#111', mb: 3 }}>AI Priority Actions</Typography>
          <Stack spacing={2.8}>
            {actions.map((a, i) => (
              <Box key={`${a.text}-${i}`}>
                <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#111', lineHeight: 1.35 }}>
                  <span style={{ marginRight: 6, fontWeight: 800 }}>{i + 1}.</span>{a.text}
                </Typography>
                {a.meta && <Typography sx={{ fontSize: '15px', color: '#666', ml: 3.5, mt: 0.4, fontWeight: 500 }}>{a.meta}</Typography>}
                {a.tag && (
                  <Box sx={{ ml: 3.5, mt: 1, display: 'inline-block', bgcolor: a.tagBg, color: a.tagColor, px: 1.4, py: 0.4, borderRadius: '6px', fontSize: '13px', fontWeight: 800 }}>{a.tag}</Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default DecisionSupport;
