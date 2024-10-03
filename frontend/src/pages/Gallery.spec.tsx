import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('./../constants.ts', () => ({
  BASEURL: 'development',
}));

describe('Home', () => {
  const queryClient = new QueryClient();
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>,
    );

    const elem = screen.getByText('Gallery');
    expect(elem).toBeInTheDocument();
  });
});
