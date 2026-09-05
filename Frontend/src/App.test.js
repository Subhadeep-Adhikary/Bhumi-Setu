import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
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
