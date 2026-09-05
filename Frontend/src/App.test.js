import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('redirects unauthenticated users to login', () => {
  localStorage.removeItem('bhumiSetuToken');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
});
