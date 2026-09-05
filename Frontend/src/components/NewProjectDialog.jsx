import { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { createProject, hasSession } from '../api';

const initialForm = {
  title: '',
  description: '',
  documentId: '',
  status: 'pending',
  compensation: '',
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
      const data = await createProject(form);
      onCreated(data);
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
          <TextField label="Project title" name="title" value={form.title} onChange={updateField} required autoFocus />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={updateField}
            multiline
            minRows={3}
          />
          <TextField label="Document ID" name="documentId" value={form.documentId} onChange={updateField} required />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField select label="Status" name="status" value={form.status} onChange={updateField} fullWidth>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
            <TextField
              label="Compensation"
              name="compensation"
              type="number"
              value={form.compensation}
              onChange={updateField}
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
          </Stack>
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