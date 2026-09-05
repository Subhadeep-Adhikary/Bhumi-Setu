import { Box, Stack, Typography } from '@mui/material';

const parcelMatrix = [
  ['acquired', 'acquired', 'pin-green', 'acquired', 'pin-green', 'light', 'light', 'acquired', 'acquired', 'acquired'],
  ['dark', 'acquired', 'acquired', 'pin', 'light', 'striped', 'striped', 'acquired', 'acquired', 'acquired'],
  ['acquired', 'green-light', 'pin-green', 'light', 'pin-light', 'striped-light', 'acquired', 'acquired', 'acquired', null],
  ['light-green', 'pin-green', 'light', 'striped', 'white', 'white', 'acquired', null, null, null],
  ['pin-light', 'light-light', 'striped-light', 'white', 'acquired', 'acquired', null, null, null, null],
  ['light-light', 'white', 'white', 'acquired', 'acquired', null, null, null, null, null],
  ['striped-light', 'acquired', 'acquired', 'acquired', null, null, null, null, null, null],
];

const parcelStyles = {
  acquired: { bg: '#0d7a4a', shadow: '0 6px 12px rgba(13,122,74,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' },
  dark: { bg: '#064e2e', shadow: '0 6px 12px rgba(6,78,46,0.5)' },
  'green-light': { bg: '#5db85a', shadow: '0 6px 12px rgba(93,184,90,0.3)' },
  light: { bg: '#4db88a', shadow: '0 6px 12px rgba(77,184,138,0.3)' },
  'light-green': { bg: '#8ed14f', shadow: '0 6px 12px rgba(142,209,79,0.3)' },
  'light-light': { bg: '#a8d5c2', shadow: '0 4px 8px rgba(0,0,0,0.08)' },
  'striped-light': { bg: 'repeating-linear-gradient(45deg, #c8e8d8 0px, #c8e8d8 4px, #e2f1e8 4px, #e2f1e8 8px)', shadow: '0 4px 8px rgba(0,0,0,0.05)' },
  striped: { bg: 'repeating-linear-gradient(45deg, #b8d8c8 0px, #b8d8c8 4px, #d8e8dc 4px, #d8e8dc 8px)', shadow: '0 4px 8px rgba(0,0,0,0.05)' },
  white: { bg: '#ffffff', shadow: '0 4px 8px rgba(0,0,0,0.06), inset 0 0 0 1px #e0e0e0' },
  'pin-green': { bg: '#6fbf73', hasPin: true },
  'pin': { bg: '#2d9a5a', hasPin: true },
  'pin-light': { bg: '#7ed3b2', hasPin: true },
};

const ParcelBox = ({ type }) => {
  if (!type) return <Box />;
  const style = parcelStyles[type] || parcelStyles['white'];
  return (
    <Box sx={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '14px', bgcolor: style.hasPin? style.bg : undefined, background:!style.hasPin? style.bg : undefined, boxShadow: style.shadow, display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.6)' }}>
      {style.hasPin && <Box sx={{ fontSize: 26, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}>📍</Box>}
    </Box>
  );
};

function GISMap() {
  return (
    <Box sx={{ width: '100%', p: 0, boxSizing: 'border-box' }}>
      <Box sx={{ width: '100%', display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>

        {/* LEFT MAP */}
        <Box sx={{ flex: 1.6, bgcolor: '#f6f9f2', borderRadius: '26px', p: 3.5, boxShadow: '0 12px 36px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.8)', minHeight: 720 }}>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#3a6a5a' }}>
              India <span style={{ opacity: 0.5 }}> › </span> Madhya Pradesh <span style={{ opacity: 0.5 }}> › </span> Narsinghpur <span style={{ opacity: 0.5 }}> › </span> <span style={{ fontWeight: 900, color: '#0f2e22' }}>NH-44 Project</span> <span style={{ color: '#5a9a8a', marginLeft: 12, fontWeight: 700 }}>District</span>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ px: 2, py: 1, bgcolor: '#eef4eb', borderRadius: 2.5, fontSize: 12, fontWeight: 700, color: '#2a5a45', textAlign: 'center', lineHeight: 1.2 }}>PostGIS ST_Buffer - ST_Intersects<br/><span style={{ color: '#5a8a6e', fontWeight: 500 }}>active</span></Box>
              <Box sx={{ px: 2.5, py: 1, bgcolor: '#eef4eb', borderRadius: 2.5, fontSize: 13, fontWeight: 800, color: '#2a5a45', display: 'grid', placeItems: 'center' }}>Draw<br/>Corridor</Box>
              <Box sx={{ px: 2.5, py: 1, bgcolor: '#eef4eb', borderRadius: 2.5, fontSize: 13, fontWeight: 800, color: '#2a5a45', display: 'grid', placeItems: 'center' }}>Upload<br/>KML</Box>
            </Box>
          </Stack>

          <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#1a3a2e', mb: 2.5 }}>Corridor Buffer: 500m</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 1.4, width: '100%' }}>
            {parcelMatrix.flat().map((p, i) => <ParcelBox key={i} type={p} />)}
          </Box>

          {/* BIG LEGEND - CLEARLY VISIBLE */}
          <Box sx={{
            mt: 3.5,
            display: 'flex',
            gap: 3.5,
            bgcolor: '#ffffff',
            p: 2.2,
            px: 3.2,
            borderRadius: '16px',
            width: 'fit-content',
            boxShadow: '0 8px 24px rgba(0,0,0,0.09)',
            border: '1px solid #e3ece0'
          }}>
            {[
              { c: '#064e2e', l: 'Acquired' },
              { c: '#0d7a4a', l: 'Under Acquisition' },
              { c: '#8ed14f', l: 'Proposed' },
              { c: '#a8d5c2', l: 'Possession Pending' },
              { c: '#ffffff', l: 'Not Affected', border: true },
            ].map((x) => (
              <Box key={x.l} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '7px',
                  bgcolor: x.c,
                  border: x.border? '2px solid #8a8a8a' : '1px solid rgba(0,0,0,0.12)',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
                  flexShrink: 0
                }} />
                <Typography sx={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: '#102418',
                  letterSpacing: '-0.01em'
                }}>
                  {x.l}
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>

        {/* RIGHT STATS */}
        <Box sx={{ flex: 0.55, display: 'flex', flexDirection: 'column', gap: 1.8, minWidth: 340 }}>
          {[
            { icon: '🗺️', val: '3,842', label: 'Total Parcels' },
            { icon: '✅', val: '2,761', label: 'Acquired', color: '#0d7a4a' },
            { icon: '📌', val: '680', label: 'Proposed' },
            { icon: '📐', val: '4,210 ha', label: 'Affected Area' },
          ].map((card) => (
            <Box key={card.label} sx={{ bgcolor: '#f6f9f2', borderRadius: '20px', p: 3, display: 'flex', alignItems: 'center', gap: 2.2, boxShadow: '0 8px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <Typography sx={{ fontSize: 30 }}>{card.icon}</Typography>
              <Box>
                <Typography sx={{ fontSize: 26, fontWeight: 900, color: card.color || '#1a3a2e', lineHeight: 1 }}>{card.val}</Typography>
                <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: '#5a7a6a' }}>{card.label}</Typography>
              </Box>
            </Box>
          ))}

          <Box sx={{ bgcolor: '#e8f0d8', borderRadius: '20px', p: 3.2, mt: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
            <Typography sx={{ fontSize: 19, fontWeight: 900, color: '#1a3a2e', mb: 2 }}>Corridor Detection</Typography>
            <Stack spacing={1.6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ fontSize: 14.5, color: '#4a6a5a' }}>Buffer Radius</Typography><Typography sx={{ fontSize: 14.5, fontWeight: 800 }}>500m</Typography></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ fontSize: 14.5, color: '#4a6a5a' }}>Intersecting</Typography><Typography sx={{ fontSize: 14.5, fontWeight: 800 }}>380 parcels</Typography></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ fontSize: 14.5, color: '#4a6a5a' }}>Corridor Length</Typography><Typography sx={{ fontSize: 14.5, fontWeight: 800 }}>142 km</Typography></Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GISMap;