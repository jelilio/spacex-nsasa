import { render, screen } from '@testing-library/react';
import Apod from './Apod';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('./../constants.ts', () => ({
  BASEURL: 'development',
}));

describe('Home', () => {
  const queryClient = new QueryClient();
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Apod />
      </QueryClientProvider>,
    );

    const elem = screen.getByText('Picture of the Day');
    expect(elem).toBeInTheDocument();
  });
});
