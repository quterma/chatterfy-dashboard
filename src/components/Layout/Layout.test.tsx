import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders header with title and subtitle', () => {
    render(<Layout />);

    expect(screen.getByText('Usage Analytics')).toBeInTheDocument();
    expect(
      screen.getByText('Analyze usage costs and trends')
    ).toBeInTheDocument();
  });

  it('renders filters and graph sections', () => {
    render(<Layout />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('graph')).toBeInTheDocument();
  });

  it('renders footer with GitHub link', () => {
    render(<Layout />);
    const footer = screen.getByText('GitHub');

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('href', 'https://github.com/quterma');
  });
});
