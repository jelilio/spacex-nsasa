import { render, screen } from '@testing-library/react';
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('./../constants.ts', () => ({
  BASEURL: 'development',
}));

describe('Home', () => {
  const queryClient = new QueryClient();
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const elem = screen.getByText('Home');
    expect(elem).toBeInTheDocument();
  });
});
