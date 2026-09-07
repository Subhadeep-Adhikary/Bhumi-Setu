import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { hasSession } from '../api';

const initialForm = {
  projectName: '',
  description: '',
  parcelId: '',
};

export default function NewProjectDialog({
  open,
  onClose,
  onCreated,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function closeDialog() {
    if (saving) return;

    setError('');
    setForm(initialForm);
    onClose();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!hasSession()) {
      setError('Please log in before creating a project.');
      return;
    }

    setSaving(true);

    try {
      await onCreated(form);
      closeDialog();
    } catch (requestError) {
      setError(
        requestError.message || 'Unable to reach the server'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: { xs: 3, sm: 4 },
          overflow: 'hidden',

          border: '1px solid #dce9d9',

          boxShadow:
            '0 28px 80px rgba(26, 72, 53, 0.18)',

          bgcolor: '#ffffff',

          mx: { xs: 1.5, sm: 2 },
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(16, 45, 34, 0.38)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <DialogTitle
        sx={{
          p: 0,
          bgcolor: '#f4f9f1',
          borderBottom: '1px solid #e1eadf',
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: { xs: 2.3, sm: 3 },

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.6}
          >
            {/* Icon */}

            <Box
              sx={{
                width: { xs: 44, sm: 50 },
                height: { xs: 44, sm: 50 },

                flexShrink: 0,

                display: 'grid',
                placeItems: 'center',

                borderRadius: 2.5,

                bgcolor: '#dff0df',
                color: '#17633d',

                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <AddLocationAltOutlinedIcon
                sx={{
                  fontSize: { xs: 23, sm: 26 },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 23,
                  },

                  lineHeight: 1.15,

                  fontWeight: 900,

                  color: '#173e2f',

                  letterSpacing: '-0.3px',
                }}
              >
                Create New Project
              </Typography>

              <Typography
                sx={{
                  mt: 0.45,

                  fontSize: {
                    xs: 11.5,
                    sm: 12.5,
                  },

                  color: '#6b8779',

                  fontWeight: 600,
                }}
              >
                Add a land acquisition project to Bhoomi Setu
              </Typography>
            </Box>
          </Stack>

          {/* Close */}

          <Button
            onClick={closeDialog}
            disabled={saving}
            aria-label="Close dialog"
            sx={{
              minWidth: 38,
              width: 38,
              height: 38,

              borderRadius: '50%',

              color: '#557568',

              bgcolor: 'rgba(255,255,255,0.7)',

              '&:hover': {
                bgcolor: '#ffffff',
                color: '#173e2f',
              },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </Button>
        </Box>
      </DialogTitle>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <DialogContent
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5,
          },

          bgcolor: '#ffffff',
        }}
      >
        <Stack
          component="form"
          id="new-project-form"
          onSubmit={handleSubmit}
          spacing={2.4}
          sx={{
            pt: 0.5,
          }}
        >
          {/* ERROR */}

          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: 2.5,

                border: '1px solid #f0c9c5',

                bgcolor: '#fff6f5',

                color: '#8e2f27',

                fontSize: 13,

                fontWeight: 600,

                '& .MuiAlert-icon': {
                  color: '#b3261e',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* =================================================
              PROJECT NAME
          ================================================== */}

          <Box>
            <Typography
              sx={{
                mb: 0.8,

                fontSize: 12,
                fontWeight: 850,

                color: '#315c4c',

                letterSpacing: 0.15,
              }}
            >
              Project name
              <Box
                component="span"
                sx={{
                  color: '#d14c43',
                  ml: 0.3,
                }}
              >
                *
              </Box>
            </Typography>

            <TextField
              fullWidth
              name="projectName"
              value={form.projectName}
              onChange={updateField}
              placeholder="e.g. NH-44 Land Acquisition"
              required
              autoFocus
              disabled={saving}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.2,
                  bgcolor: '#fbfdfb',

                  '& fieldset': {
                    borderColor: '#d7e4d5',
                  },

                  '&:hover fieldset': {
                    borderColor: '#9fc7aa',
                  },

                  '&.Mui-focused': {
                    bgcolor: '#ffffff',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#23875f',
                    borderWidth: 2,
                  },
                },

                '& input': {
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#193d30',
                },

                '& input::placeholder': {
                  color: '#9aaa9f',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <Box>
            <Typography
              sx={{
                mb: 0.8,

                fontSize: 12,
                fontWeight: 850,

                color: '#315c4c',
              }}
            >
              Project description
              <Box
                component="span"
                sx={{
                  color: '#d14c43',
                  ml: 0.3,
                }}
              >
                *
              </Box>
            </Typography>

            <TextField
              fullWidth
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Briefly describe the project, corridor, or acquisition scope..."
              required
              multiline
              minRows={4}
              disabled={saving}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.2,
                  bgcolor: '#fbfdfb',

                  alignItems: 'flex-start',

                  '& fieldset': {
                    borderColor: '#d7e4d5',
                  },

                  '&:hover fieldset': {
                    borderColor: '#9fc7aa',
                  },

                  '&.Mui-focused': {
                    bgcolor: '#ffffff',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#23875f',
                    borderWidth: 2,
                  },
                },

                '& textarea': {
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.6,
                  color: '#193d30',
                },

                '& textarea::placeholder': {
                  color: '#9aaa9f',
                  opacity: 1,
                },
              }}
            />

            <Typography
              sx={{
                mt: 0.7,

                fontSize: 10.5,

                color: '#8aa096',

                fontWeight: 550,
              }}
            >
              Add enough context to help identify the project later.
            </Typography>
          </Box>

          {/* =================================================
              PARCEL ID
          ================================================== */}

          <Box>
            <Typography
              sx={{
                mb: 0.8,

                fontSize: 12,
                fontWeight: 850,

                color: '#315c4c',
              }}
            >
              Land parcel ID
              <Box
                component="span"
                sx={{
                  color: '#d14c43',
                  ml: 0.3,
                }}
              >
                *
              </Box>
            </Typography>

            <TextField
              fullWidth
              name="parcelId"
              value={form.parcelId}
              onChange={updateField}
              placeholder="e.g. MP-NGP-004281"
              required
              disabled={saving}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.2,
                  bgcolor: '#fbfdfb',

                  '& fieldset': {
                    borderColor: '#d7e4d5',
                  },

                  '&:hover fieldset': {
                    borderColor: '#9fc7aa',
                  },

                  '&.Mui-focused': {
                    bgcolor: '#ffffff',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#23875f',
                    borderWidth: 2,
                  },
                },

                '& input': {
                  fontSize: 14,
                  fontWeight: 650,
                  color: '#193d30',
                  letterSpacing: 0.2,
                },

                '& input::placeholder': {
                  color: '#9aaa9f',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* INFO BOX */}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.1,

              p: 1.5,

              bgcolor: '#f2f8ef',

              borderRadius: 2.2,

              border: '1px solid #dfebd9',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,

                flexShrink: 0,

                display: 'grid',
                placeItems: 'center',

                borderRadius: '50%',

                bgcolor: '#dcefdc',
                color: '#267251',

                fontSize: 12,
                fontWeight: 900,
              }}
            >
              i
            </Box>

            <Typography
              sx={{
                fontSize: 11.5,
                lineHeight: 1.55,

                color: '#607d6f',

                fontWeight: 550,
              }}
            >
              Once created, the project will appear in your project
              dashboard where you can continue parcel verification
              and statutory workflow.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Divider sx={{ borderColor: '#e5ece3' }} />

      <DialogActions
        sx={{
          px: {
            xs: 2.5,
            sm: 3.5,
          },

          py: {
            xs: 1.8,
            sm: 2.2,
          },

          bgcolor: '#fbfdfb',

          justifyContent: 'space-between',
        }}
      >
        {/* Required note */}

        <Typography
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },

            fontSize: 10.5,

            color: '#8a9d94',

            fontWeight: 600,
          }}
        >
          * Required fields
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: {
              xs: '100%',
              sm: 'auto',
            },

            justifyContent: {
              xs: 'flex-end',
              sm: 'initial',
            },
          }}
        >
          <Button
            onClick={closeDialog}
            disabled={saving}
            sx={{
              minHeight: 42,

              px: 2,

              borderRadius: 2,

              color: '#547366',

              fontWeight: 750,

              textTransform: 'none',

              '&:hover': {
                bgcolor: '#edf4eb',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="new-project-form"
            variant="contained"
            disabled={saving}
            startIcon={
              saving ? null : <CheckRoundedIcon />
            }
            sx={{
              minHeight: 42,

              px: {
                xs: 2,
                sm: 2.5,
              },

              borderRadius: 2,

              bgcolor: '#17633d',

              color: '#ffffff',

              fontWeight: 850,

              textTransform: 'none',

              boxShadow:
                '0 6px 16px rgba(23,99,61,0.20)',

              '&:hover': {
                bgcolor: '#125534',

                boxShadow:
                  '0 8px 20px rgba(23,99,61,0.26)',
              },

              '&.Mui-disabled': {
                bgcolor: '#a9c5b4',
                color: '#f4faf6',
              },
            }}
          >
            {saving ? 'Creating project...' : 'Create project'}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}