import { Box, Stack, Typography } from '@mui/material';
import { useProjectDetail } from '../hooks/projectdetail';

function Workflow({ projectId }) {
  const project = useProjectDetail(projectId);
  const activeStage = project.stages.find((stage) => stage.status === 'active') || project.stages[project.stages.length - 1];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 980,
        bgcolor: '#edf2ed',
        borderRadius: 3,
        p: 2.8,
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#183f35' }}>
          RFCTLARR Statutory Milestones
        </Typography>

        <Box
          sx={{
            bgcolor: '#dfece1',
            color: '#1b5e4e',
            borderRadius: 2,
            px: 1.4,
            py: 0.8,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {project.risk}
        </Box>
      </Stack>

      <Stack direction="row" alignItems="flex-start" spacing={1.8} sx={{ mb: 4 }}>
        {project.stages.map((stage, index) => {
          const isActive = stage.status === 'active';
          const isCompleted = stage.status === 'completed';

          return (
            <Box key={stage.title} sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  mx: 'auto',
                  borderRadius: '50%',
                  bgcolor: isCompleted ? '#1f8e67' : isActive ? '#d8eee7' : '#e8efe9',
                  border: isActive ? '3px solid #0e5a49' : '2px solid #b7d2bf',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCompleted ? '#ffffff' : '#183f35',
                  fontWeight: 800,
                  fontSize: 15,
                  mb: 1.5,
                  position: 'relative',
                }}
              >
                {isCompleted ? '✓' : stage.short}

                {index < project.stages.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 'calc(100% + 10px)',
                      width: 'calc(100% - 10px)',
                      height: 2,
                      bgcolor: isCompleted ? '#1f8e67' : '#c9dbcf',
                    }}
                  />
                )}
              </Box>

              <Typography sx={{ fontSize: 13, color: '#133f33', fontWeight: 700, mb: 0.5 }}>
                {stage.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#4d7866', fontWeight: 600 }}>
                {stage.date}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
        <Box sx={{ flex: 1, bgcolor: '#ebf5ef', borderRadius: 3, p: 2.8, border: '1px solid rgba(20,98,73,0.12)' }}>
          <Typography sx={{ fontSize: 13, color: '#2d5a4d', fontWeight: 800, letterSpacing: 1.1, textTransform: 'uppercase', mb: 1 }}>
            Active Stage
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#173f33', lineHeight: 1.1 }}>
                {activeStage.title}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#4d7866', fontWeight: 600 }}>
                {activeStage.date}
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#dfeee7',
                borderRadius: 999,
                px: 1.5,
                py: 0.5,
                color: '#1a6f56',
                fontSize: 12,
                fontWeight: 800,
              }}
            >
                {activeStage.activeLabel || (activeStage.status === 'completed' ? 'Completed' : 'Pending')}
            </Box>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, bgcolor: '#edf5ef', borderRadius: 3, p: 2.8, border: '1px solid rgba(20,98,73,0.12)' }}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#1b473d', mb: 1 }}>
            Why Is This Project Delayed?
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#4d7866', fontWeight: 500, mb: 2 }}>
            AI-identified bottlenecks &amp; recommended actions
          </Typography>

          <Stack spacing={1.4}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
              <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#29a16a', color: '#fff', fontSize: 12, display: 'grid', placeItems: 'center', fontWeight: 800, mt: 0.15 }}>1</Box>
              <Typography sx={{ fontSize: 14, color: '#20493d', lineHeight: 1.5 }}>
                3 unresolved objection pending hearing (Sec. 15)<br />
                <span style={{ color: '#4d7866' }}>— Schedule hearing by 10 Sep</span>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
              <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#29a16a', color: '#fff', fontSize: 12, display: 'grid', placeItems: 'center', fontWeight: 800, mt: 0.15 }}>2</Box>
              <Typography sx={{ fontSize: 14, color: '#20493d', lineHeight: 1.5 }}>
                Compensation fund release awaiting PFMS approval<br />
                <span style={{ color: '#4d7866' }}>— Escalate to DM office</span>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Workflow;
