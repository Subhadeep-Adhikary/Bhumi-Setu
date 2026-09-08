import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard';
import { clearSession } from './api';

test('redirects unauthenticated users to login', () => {
  clearSession();
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
});

test('shows only the two most recently created projects and allows selection', () => {
  const projects = [
    { id: 'p-1', name: 'Oldest Project', parcelId: 'P-001', state: 'Gujarat', district: 'Ahmedabad', status: 'pending', createdAt: '2024-01-01T00:00:00.000Z' },
    { id: 'p-2', name: 'Middle Project', parcelId: 'P-002', state: 'Karnataka', district: 'Mysuru', status: 'pending', createdAt: '2024-02-01T00:00:00.000Z' },
    { id: 'p-3', name: 'Newest Project', parcelId: 'P-003', state: 'Rajasthan', district: 'Kota', status: 'pending', createdAt: '2024-03-01T00:00:00.000Z' },
  ];

  const onSelectProject = jest.fn();

  render(
    <BrowserRouter>
      <Dashboard projects={projects} selectedProject={null} onSelectProject={onSelectProject} />
    </BrowserRouter>,
  );

  expect(screen.getByRole('button', { name: /newest project/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /middle project/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /oldest project/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /newest project/i }));
  expect(onSelectProject).toHaveBeenCalledWith(projects[2]);
});
