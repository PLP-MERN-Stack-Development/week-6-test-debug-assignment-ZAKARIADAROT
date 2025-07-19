import { render, screen, fireEvent } from '@testing-library/react';
import BugList from '../../components/BugList';
import { BugContext } from '../../context/BugContext';

test('renders loading state', () => {
  render(
    <BugContext.Provider value={{ state: { bugs: [], loading: true, error: null }, dispatch: jest.fn() }}>
      <BugList />
    </BugContext.Provider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders bugs and delete button', () => {
  const bugs = [{ _id: '1', title: 'Bug 1', status: 'open' }];
  render(
    <BugContext.Provider value={{ state: { bugs, loading: false, error: null }, dispatch: jest.fn() }}>
      <BugList />
    </BugContext.Provider>
  );
  expect(screen.getByText(/Bug 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
});
