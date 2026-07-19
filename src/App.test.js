import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => children,
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));

test('renders the product landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /launch custom data apps/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /start building/i })).toBeInTheDocument();
});
