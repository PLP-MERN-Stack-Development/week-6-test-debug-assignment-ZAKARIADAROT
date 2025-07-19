import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';
import { BugContext } from '../../context/BugContext';

// Mock dispatch & createBug
jest.mock('../../services/bugService', () => ({
  createBug: jest.fn(() => Promise.resolve({ _id: '1', title: 'Test Bug', description: 'Test Desc' }))
}));

test('renders BugForm inputs and button', () => {
  render(
    <BugContext.Provider value={{ dispatch: jest.fn() }}>
      <BugForm />
    </BugContext.Provider>
  );
  
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Bug/i)).toBeInTheDocument();
});

test('submits form and calls createBug', async () => {
  const mockDispatch = jest.fn();
  render(
    <BugContext.Provider value={{ dispatch: mockDispatch }}>
      <BugForm />
    </BugContext.Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Bug 1' } });
  fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Desc 1' } });
  fireEvent.click(screen.getByText(/Add Bug/i));

  expect(await screen.findByDisplayValue('')).toBeInTheDocument(); // Inputs reset after submit
  expect(mockDispatch).toHaveBeenCalled(); // Dispatch called
});
