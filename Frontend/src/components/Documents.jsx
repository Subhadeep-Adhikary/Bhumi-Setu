import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useProjectDetail } from '../hooks/projectdetail';

function Documents({ projectId, projects }) {
  const project = useProjectDetail(projectId, projects);
  if (!project) return <Typography sx={{ p: 4, color: '#4d7866' }}>No project selected</Typography>;
  const documents = project.documents;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f0f4f0', p: 3, boxSizing: 'border-box' }}>
      <Box
        sx={{
          width: '100%',
          height: 400,
          minHeight: 400,
          bgcolor: '#eef6ef',
          border: '2.2px dashed #7fb08e',
          borderRadius: '22px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3.5,
        }}
      >
        <Box sx={{ width: 80, height: 80, bgcolor: '#d4e8d6', borderRadius: '50%', display: 'grid', placeItems: 'center', mb: 2.5 }}>
          <Typography sx={{ fontSize: 38 }}>☁️</Typography>
        </Box>

        <Typography sx={{ fontSize: '28px', fontWeight: 900, color: '#0f1a14', mb: 1.2, letterSpacing: '-0.5px' }}>
          Upload Land Records
        </Typography>

        <Typography sx={{ fontSize: '19px', fontWeight: 600, color: '#3a5a4d', mb: 3.2 }}>
          Jamabandi, Khatiyan, Form 7/12 — drag & drop or browse
        </Typography>

        <Button
          sx={{
            bgcolor: '#0f5d36',
            color: '#fff',
            height: 56,
            px: 6,
            borderRadius: '14px',
            fontSize: '18px',
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: '0 8px 20px rgba(15,93,54,0.35)',
            mb: 3,
            '&:hover': { bgcolor: '#0c4c2c' },
          }}
        >
          Browse Files
        </Button>

        <Typography sx={{ fontSize: '15.5px', fontWeight: 600, color: '#6b8a7d' }}>
          PaddleOCR-powered extraction · PDF, JPG, PNG supported
        </Typography>
      </Box>

      <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #e0e6e1', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.06)' }}>
        <Box sx={{ height: 72, px: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eef1ee' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#0f1a14' }}>Verified Documents</Typography>
          <Stack direction="row" spacing={1.2}>
            <Box sx={{ bgcolor: '#d9f0db', px: 1.8, py: 0.7, borderRadius: '10px', fontSize: '14.5px', fontWeight: 800, color: '#145a27' }}>{documents.filter((doc) => doc.status === 'Verified').length} Verified</Box>
            <Box sx={{ bgcolor: '#fde0e0', px: 1.8, py: 0.7, borderRadius: '10px', fontSize: '14.5px', fontWeight: 800, color: '#8b2a2a' }}>{documents.filter((doc) => doc.status === 'Mismatch').length} Mismatch</Box>
            <Box sx={{ bgcolor: '#fef1b8', px: 1.8, py: 0.7, borderRadius: '10px', fontSize: '14.5px', fontWeight: 800, color: '#6b4e08' }}>{documents.filter((doc) => doc.status === 'Processing...').length} Pending OCR</Box>
          </Stack>
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ height: 52, bgcolor: '#f9fbf9' }}>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: '30%' }}>DOCUMENT</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40' }}>OWNER</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: 80 }}>PLOT #</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: 80 }}>AREA</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: 135 }}>OCR MATCH</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: 120 }}>STATUS</TableCell>
              <TableCell sx={{ fontSize: '14.5px', fontWeight: 800, color: '#2f4a40', width: 130 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.name} sx={{ height: 76, '&:hover': { bgcolor: '#f8fbf8' }, '& td': { borderBottom: '1px solid #f0f2f0' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
                    <Box sx={{ minWidth: 42, height: 42, bgcolor: '#e8f0e9', borderRadius: '11px', display: 'grid', placeItems: 'center', fontSize: 18 }}>📄</Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#111', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>{doc.owner}</TableCell>
                <TableCell sx={{ fontSize: '18px', fontWeight: 600, color: '#222' }}>{doc.plot}</TableCell>
                <TableCell sx={{ fontSize: '18px', fontWeight: 600, color: '#222' }}>{doc.area}</TableCell>
                <TableCell>
                  {doc.status.includes('Pending') || doc.match === 0 ? (
                    <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#666' }}>Processing...</Typography>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
                      <Box sx={{ width: 62, height: 9, bgcolor: '#e6ece7', borderRadius: 99 }}>
                        <Box sx={{ width: `${doc.match}%`, height: '100%', bgcolor: doc.match > 80 ? '#1faa5a' : '#e84a4a', borderRadius: 99 }} />
                      </Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 900, color: doc.match > 80 ? '#157a3e' : '#c33' }}>{doc.match}%</Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.6,
                      py: 0.6,
                      borderRadius: '10px',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      bgcolor: doc.status === 'Verified' ? '#d9f0db' : doc.status === 'Mismatch' ? '#fde0e0' : '#fef1b8',
                      color: doc.status === 'Verified' ? '#145a27' : doc.status === 'Mismatch' ? '#8b2a2a' : '#6b4e08',
                    }}
                  >
                    {doc.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1.2}>
                    <Box sx={{ fontSize: '14.5px', fontWeight: 700, border: '2px solid #b8d2bd', px: 1.8, py: 0.7, borderRadius: '10px', cursor: 'pointer', bgcolor: '#f3f9f4', color: '#0f3d22' }}>View</Box>
                    {doc.flagged && <Box sx={{ fontSize: '14.5px', fontWeight: 800, border: '2px solid #f0a8a8', bgcolor: '#fff0f0', px: 1.8, py: 0.7, borderRadius: '10px', cursor: 'pointer', color: '#8b2a2a' }}>Flag</Box>}
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
