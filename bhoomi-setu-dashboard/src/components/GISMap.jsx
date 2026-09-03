import { Box, Stack, Typography } from '@mui/material';

const parcelMatrix = [
  ['acquired', 'acquired', 'acquired', 'acquired', 'acquired', 'acquired', 'acquired', 'acquired', 'acquired', 'acquired'],
  ['acquired', 'pending', 'under', 'under', 'under', 'under', 'under', 'proposed', 'proposed', 'acquired'],
  ['acquired', 'pending', 'under', 'under', 'under', 'proposed', 'proposed', 'proposed', 'acquired', 'acquired'],
  ['acquired', 'under', 'under', 'under', 'pending', 'proposed', 'proposed', 'proposed', 'acquired', 'acquired'],
  ['pending', 'under', 'under', 'under', 'proposed', 'proposed', 'proposed', 'acquired', 'acquired', 'acquired'],
  ['pending', 'under', 'under', 'under', 'proposed', 'proposed', 'planned', 'acquired', 'acquired', 'acquired'],
  ['under', 'under', 'under', 'under', 'proposed', 'proposed', 'planned', 'planned', 'acquired', 'acquired'],
  ['under', 'under', 'under', 'planned', 'planned', 'planned', 'acquired', 'acquired', 'acquired', 'acquired'],
  ['under', 'pending', 'pending', 'planned', 'planned', 'planned', 'acquired', 'acquired', 'acquired', 'acquired'],
  ['under', 'pending', 'pending', 'planned', 'planned', 'planned', 'planned', 'acquired', 'acquired', 'acquired'],
];

const parcelColors = {
  acquired: '#0f8f61',
  under: '#7ed5a1',
  proposed: '#d8f0d9',
  pending: '#f5ead8',
  planned: '#e9f0eb',
};

const statCards = [
  { label: 'Acquired', value: '2,761', color: '#0f8f61' },
  { label: 'Proposed', value: '680', color: '#d8f0d9' },
  { label: 'Affected Area', value: '4,210 ha', color: '#d9c3ab' },
];

function GISMap() {
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 30, fontWeight: 800, color: '#183f35' }}>GIS Land Map</Typography>
          <Typography sx={{ fontSize: 16, color: '#4d7866', fontWeight: 500 }}>
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

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.8 }}>
        <Box sx={{ flex: 1.8, minWidth: 0 }}>
          <Box sx={{ mb: 1.8, color: '#284e45', fontSize: 13, fontWeight: 700 }}>
            India &nbsp;›&nbsp; Madhya Pradesh &nbsp;›&nbsp; Narsinghpur &nbsp;›&nbsp; NH-44 Project
          </Box>

          <Box
            sx={{
              bgcolor: '#edf5ee',
              borderRadius: 3,
              p: 2,
              border: '1px solid rgba(62,100,77,0.12)',
              minHeight: 520,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.8 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#2d655a', letterSpacing: 0.5 }}>
                Corridor Buffer: <span style={{ color: '#1d423a', fontWeight: 700 }}>500m</span>
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#2d655a', letterSpacing: 0.5 }}>
                PostGIS ST_Buffer — ST_Intersects
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
                gap: 0.5,
                width: '100%',
                maxWidth: 620,
                mx: 'auto',
                mt: 1.2,
              }}
            >
              {parcelMatrix.flat().map((parcel, index) => (
                <Box
                  key={`${parcel}-${index}`}
                  sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: 0.8,
                    bgcolor: parcelColors[parcel] || '#edf5ee',
                    border: parcel === 'planned' ? '1px solid rgba(48,90,72,0.15)' : 'none',
                    boxShadow: parcel === 'acquired' ? 'inset 0 0 0 1px rgba(255,255,255,0.25)' : 'none',
                  }}
                />
              ))}
            </Box>

            <Stack direction="row" spacing={2.6} sx={{ mt: 3, flexWrap: 'wrap' }}>
              {[
                { label: 'Acquired', color: '#0f8f61' },
                { label: 'Under Acquisition', color: '#8fd2a6' },
                { label: 'Proposed', color: '#dfe9de' },
                { label: 'Possession Pending', color: '#f7e8d4' },
                { label: 'Not Affected', color: '#f6f9f5' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: 0.8, bgcolor: item.color }} />
                  <Typography sx={{ fontSize: 13, color: '#2f5b4d', fontWeight: 600 }}>{item.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ flex: 0.9, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {statCards.map((card) => (
            <Box
              key={card.label}
              sx={{
                bgcolor: '#f2f5f1',
                borderRadius: 2.5,
                p: 1.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                border: '1px solid rgba(70,108,88,0.1)',
              }}
            >
              <Box sx={{ fontSize: 16, color: '#255b4b', fontWeight: 700 }}>{card.label}</Box>
              <Box sx={{ fontSize: 22, fontWeight: 800, color: '#173f33' }}>{card.value}</Box>
            </Box>
          ))}

          <Box
            sx={{
              bgcolor: '#f2f5f1',
              borderRadius: 2.5,
              p: 1.8,
              border: '1px solid rgba(70,108,88,0.1)',
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#1a4338', mb: 1 }}>Corridor Detection</Typography>
            <Stack spacing={1.1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#2b5b4a', fontSize: 14 }}>
                <span>Buffer Radius</span>
                <strong>500m</strong>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#2b5b4a', fontSize: 14 }}>
                <span>Intersecting</span>
                <strong>380 parcels</strong>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#2b5b4a', fontSize: 14 }}>
                <span>Corridor Length</span>
                <strong>142 km</strong>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GISMap;
