import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dashboard view', () => {
  render(<App />);

  expect(screen.getByText(/National Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Polavaram Irrigation Canal Network/i)).toBeInTheDocument();
});
