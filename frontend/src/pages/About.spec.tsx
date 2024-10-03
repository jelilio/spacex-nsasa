import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  test('renders correctly', () => {
    render(<About />);
    const elem = screen.getByText('About');
    expect(elem).toBeInTheDocument();
  });
});
