import { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { hasSession } from '../api';

const initialForm = {
  projectName: '',
  description: '',
  parcelId: '',
};

export default function NewProjectDialog({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function closeDialog() {
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
      setError(requestError.message || 'Unable to reach the server');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800 }}>Create New Project</DialogTitle>
      <DialogContent>
        <Stack component="form" id="new-project-form" onSubmit={handleSubmit} spacing={2.2} sx={{ pt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Project name" name="projectName" value={form.projectName} onChange={updateField} required autoFocus />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={updateField}
            required
            multiline
            minRows={3}
          />
          <TextField label="Land parcel ID" name="parcelId" value={form.parcelId} onChange={updateField} required />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={closeDialog} disabled={saving}>Cancel</Button>
        <Button type="submit" form="new-project-form" variant="contained" disabled={saving}>
          {saving ? 'Creating...' : 'Create project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
