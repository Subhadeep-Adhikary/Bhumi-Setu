import { Box, Typography, LinearProgress, Stack } from '@mui/material';

const Donut3D = ({ value, c1, c2 }) => {
  const size = 108;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const offset = C - (value / 100) * C;
  const id = `grad-${c1}-${value}`;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <filter id={`shadow-${value}`}>
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#d9e2d9" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="#f3f7f0" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={`url(#${id})`} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={C} strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          filter={`url(#shadow-${value})`}
        />
      </svg>
      <Box sx={{ position: 'absolute', inset: `${stroke}px`, bgcolor: '#f8fbf6', borderRadius: '50%', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.12)' }} />
      <Typography sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#1d4a3d' }}>
        {value}%
      </Typography>
    </Box>
  );
};

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#e8eee3', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', p: 3 }}>
      {/* MAIN CONTAINER LIKE FIGMA */}
      <Box sx={{ width: 1120, bgcolor: '#f4f7f1', borderRadius: '24px', p: 2.5, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.8)' }}>

        {/* HEADER */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, px: 1 }}>
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: 28, color: '#162f26', lineHeight: 1.1 }}>National Dashboard</Typography>
            <Typography sx={{ fontSize: 13, color: '#5c7d6f', fontWeight: 600, mt: 0.3 }}>RFCT LARR Act — Real-time Management</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 38, height: 38, bgcolor: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>🔔</Box>
            <Box sx={{ bgcolor: '#1d7a5c', color: 'white', px: 2.2, py: 1, borderRadius: '999px', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 12px rgba(29,122,92,0.3)', cursor: 'pointer' }}>+ New Project</Box>
          </Box>
        </Box>

        {/* TOP 3 CARDS */}
        <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
          {/* Card 1 */}
          <Box sx={{ flex: 1, bgcolor: 'white', borderRadius: '20px', p: 2.2, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', border: '1px solid #eef3eb' }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#1a3a2e', lineHeight: 1.25 }}>Polavaram Irrigation Canal Network</Typography>
            <Typography sx={{ fontSize: 12, color: '#2e8a6a', fontWeight: 600, mt: 0.5 }}>Andhra Pradesh • ₹6,750 Cr</Typography>
            <Box sx={{ mt: 2.5 }}><Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1a3a2e', mb: 0.8 }}>Sec. 77 Compensation</Typography>
              <Box sx={{ position: 'relative', height: 22, bgcolor: '#e5eee6', borderRadius: 99, overflow: 'hidden' }}>
                <Box sx={{ width: '49%', height: '100%', background: 'linear-gradient(90deg, #2bc08a, #8bd5a0)', borderRadius: 99 }} />
                <Typography sx={{ position: 'absolute', right: 8, top: 0, fontSize: 13, fontWeight: 800, lineHeight: '22px', color: '#1a3a2e' }}>49%</Typography>
              </Box>
              <Typography sx={{ fontSize: 11, color: '#c44a4a', fontWeight: 700, mt: 1 }}>⚠ +634 overdue</Typography>
            </Box>
          </Box>

          {/* Card 2 */}
          <Box sx={{ flex: 1, bgcolor: 'white', borderRadius: '20px', p: 2.2, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', border: '1px solid #eef3eb' }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#1a3a2e', lineHeight: 1.25 }}>Pune-Mumbai Hyperloop Corridor</Typography>
            <Typography sx={{ fontSize: 12, color: '#2e8a6a', fontWeight: 600, mt: 0.5 }}>Maharashtra • ₹12,400 Cr</Typography>
            <Box sx={{ mt: 2.5 }}><Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1a3a2e', mb: 0.8 }}>SIA</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flex: 1, position: 'relative', height: 22, bgcolor: '#e5eee6', borderRadius: 99, overflow: 'hidden' }}>
                  <Box sx={{ width: '23%', height: '100%', background: 'linear-gradient(90deg, #4da3d6, #8ec8e6)', borderRadius: 99 }} />
                  <Typography sx={{ position: 'absolute', right: 8, top: 0, fontSize: 13, fontWeight: 800, lineHeight: '22px', color: '#1a3a2e' }}>23%</Typography>
                </Box>
                <Box sx={{ bgcolor: '#ffecd0', color: '#8a4d0a', fontSize: 11, fontWeight: 700, px: 1, py: 0.3, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 0.3 }}>🔥 Medium</Box>
              </Box>
              <Typography sx={{ fontSize: 11, color: '#b57a3a', fontWeight: 700, mt: 1 }}>◍ +56 overdue</Typography>
            </Box>
          </Box>

          {/* Card 3 - Acquisition Status */}
          <Box sx={{ flex: 1, bgcolor: 'white', borderRadius: '20px', p: 2.2, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', border: '1px solid #eef3eb' }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#1a3a2e', mb: 1.5 }}>Acquisition Status</Typography>
            {[
              { l: 'Acquired', v: 58.4, c: '#2bc08a' },
              { l: 'Under Acquisition', v: 21.2, c: '#4da3d6' },
              { l: 'Proposed', v: 13.8, c: '#8bb8d6' },
              { l: 'Poss. Pending', v: 6.6, c: '#e2a85a' },
            ].map((i) => (
              <Box key={i.l} sx={{ mb: 1.4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#2a4a3e' }}>{i.l}</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: i.c }}>{i.v}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={i.v} sx={{ height: 8, borderRadius: 99, bgcolor: '#e9efe6', '& .MuiLinearProgress-bar': { bgcolor: i.c, borderRadius: 99 } }} />
              </Box>
            ))}
          </Box>
        </Stack>

        {/* BOTTOM SNAPSHOT */}
        <Box sx={{ bgcolor: '#edf3e9', borderRadius: '20px', p: 2.5, border: '1px solid #e3ece0' }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#1a3a2e', mb: 2.5 }}>State-wise Acquisition Snapshot</Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ px: 1 }}>
            <Box textAlign="center"><Donut3D value={64} c1="#88d7b0" c2="#1fa87a" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Maharashtra</Typography><Typography sx={{ fontSize: 11, color: '#6a8a7c' }}>23 projects</Typography></Box>
            <Box textAlign="center"><Donut3D value={31} c1="#eac896" c2="#c08a4a" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Rajasthan</Typography><Typography sx={{ fontSize: 11, color: '#6a8a7c' }}>18 projects</Typography></Box>
            <Box textAlign="center"><Donut3D value={72} c1="#9ec9dc" c2="#5a8cb0" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Madhya Pradesh</Typography><Typography sx={{ fontSize: 11, color: '#6a8a7c' }}>18 projects</Typography></Box>
            <Box textAlign="center"><Donut3D value={89} c1="#88d7b0" c2="#1fa87a" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Karnataka</Typography></Box>
            <Box textAlign="center"><Donut3D value={49} c1="#8fbfe8" c2="#4a78d0" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Andhra Pradesh</Typography></Box>
            <Box textAlign="center"><Donut3D value={38} c1="#eac896" c2="#c08a4a" /><Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: 13 }}>Uttar Pradesh</Typography></Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}