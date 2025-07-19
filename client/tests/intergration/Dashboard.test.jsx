import { render, screen } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import { BugContext } from '../../context/BugContext';

test('renders Dashboard with title and form', () => {
  render(
    <BugContext.Provider value={{ state: { bugs: [], loading: false, error: null }, dispatch: jest.fn() }}>
      <Dashboard />
    </BugContext.Provider>
  );
  expect(screen.getByText(/Bug Tracker/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
});
