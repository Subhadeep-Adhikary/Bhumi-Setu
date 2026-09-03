import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const documents = [
  {
    name: 'Jambandi_NH44_Parcel_…',
    owner: 'Ramesh Kumar Singh',
    plot: '2341',
    area: '2.4 ha',
    match: 98,
    status: 'Verified',
    action: 'View',
  },
  {
    name: 'Khatiyan_DFC_Parcel_881…',
    owner: 'Sunita Devi',
    plot: '8812',
    area: '1.1 ha',
    match: 63,
    status: 'Mismatch',
    action: 'View',
    flagged: true,
  },
  {
    name: 'Form_712_Pune_Metro_…',
    owner: 'Prakash Naik',
    plot: 'P842',
    area: '0.8 ha',
    match: 0,
    status: 'Processing...',
    action: 'View',
    pending: true,
  },
];

function Documents() {
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
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#183f35' }}>Intelligent Document Verification</Typography>
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

      <Box
        sx={{
          border: '2px dashed rgba(43, 94, 73, 0.5)',
          borderRadius: 3,
          bgcolor: '#eef4ee',
          p: 3,
          textAlign: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ fontSize: 38, color: '#1d5e4b', lineHeight: 1, mb: 1 }}>⇪</Box>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#183f35', mb: 0.6 }}>
          Upload Land Records
        </Typography>
        <Typography sx={{ fontSize: 15, color: '#4d7866', mb: 2 }}>
          Jamabandi, Khatiyan, Form 7/12 — drag &amp; drop or browse
        </Typography>

        <Button
          sx={{
            bgcolor: '#1a7d5b',
            color: '#fff',
            px: 2.6,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Browse Files
        </Button>

        <Typography sx={{ fontSize: 12, color: '#4d7866', mt: 2 }}>
          PaddlcOCR-powered extraction • PDF, JPG, PNG supported
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#183f35' }}>Verified Documents</Typography>

        <Stack direction="row" spacing={1}>
          <Box sx={{ bgcolor: '#dfece1', borderRadius: 2, color: '#1a5e4c', px: 1.2, py: 0.5, fontSize: 12, fontWeight: 700 }}>3 Verified</Box>
          <Box sx={{ bgcolor: '#f8d9d9', borderRadius: 2, color: '#c84d4d', px: 1.2, py: 0.5, fontSize: 12, fontWeight: 700 }}>1 Mismatch</Box>
          <Box sx={{ bgcolor: '#f5e4bf', borderRadius: 2, color: '#9b6b00', px: 1.2, py: 0.5, fontSize: 12, fontWeight: 700 }}>1 Pending OCR</Box>
        </Stack>
      </Box>

      <Box sx={{ bgcolor: '#f8faf7', borderRadius: 3, border: '1px solid rgba(58,93,74,0.08)', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f3f1' }}>
              {['Document', 'Owner', 'Plot #', 'Area', 'OCR Match', 'Status', 'Action'].map((header) => (
                <TableCell key={header} sx={{ fontSize: 12, fontWeight: 800, color: '#355d4d', letterSpacing: 0.7, textTransform: 'uppercase' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.name} sx={{ '& td': { borderBottom: '1px solid rgba(58,93,74,0.08)' } }}>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, color: '#1b4338' }}>
                  <Box sx={{ width: 22, height: 22, borderRadius: 1, bgcolor: '#edf0ee', display: 'grid', placeItems: 'center', fontSize: 13 }}>▣</Box>
                  {doc.name}
                </TableCell>
                <TableCell sx={{ color: '#255a4c', fontWeight: 600 }}>{doc.owner}</TableCell>
                <TableCell sx={{ color: '#255a4c', fontWeight: 600 }}>{doc.plot}</TableCell>
                <TableCell sx={{ color: '#255a4c', fontWeight: 600 }}>{doc.area}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ flex: 1, height: 8, borderRadius: 999, bgcolor: '#e7efe9', overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${doc.match}%`,
                          height: '100%',
                          borderRadius: 999,
                          bgcolor: doc.status === 'Mismatch' ? '#ef5d4d' : '#3fc17a',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1d473d' }}>{doc.match}%</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      bgcolor: doc.status === 'Verified' ? '#dfece1' : doc.status === 'Mismatch' ? '#f7dbd7' : '#f5e4bf',
                      color: doc.status === 'Verified' ? '#146a56' : doc.status === 'Mismatch' ? '#ca4f4f' : '#a36b0d',
                      borderRadius: 1.5,
                      px: 1,
                      py: 0.4,
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {doc.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      sx={{
                        bgcolor: '#edf0ee',
                        color: '#1a4338',
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        minWidth: 0,
                        px: 1.3,
                        py: 0.6,
                      }}
                    >
                      View
                    </Button>
                    {doc.flagged && (
                      <Button
                        sx={{
                          bgcolor: '#f7d9d9',
                          color: '#d74d4d',
                          borderRadius: 1.5,
                          textTransform: 'none',
                          fontWeight: 700,
                          minWidth: 0,
                          px: 1.3,
                          py: 0.6,
                        }}
                      >
                        Flag
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default Documents;
