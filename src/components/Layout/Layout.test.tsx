import { act, render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { DataServiceProvider } from '../../context/DataServiceContext';

describe('Layout Component', () => {
  it('renders header with title and subtitle', async () => {
    await act(async () => {
      render(
        <DataServiceProvider>
          <Layout />
        </DataServiceProvider>
      );
    });

    expect(screen.getByText('Usage Analytics')).toBeInTheDocument();
    expect(
      screen.getByText('Analyze usage costs and trends')
    ).toBeInTheDocument();
  });

  it('renders filters and graph sections', async () => {
    await act(async () => {
      render(
        <DataServiceProvider>
          <Layout />
        </DataServiceProvider>
      );
    });

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Usage Analytics Over Time')).toBeInTheDocument();
  });

  it('renders footer with GitHub link', async () => {
    await act(async () => {
      render(
        <DataServiceProvider>
          <Layout />
        </DataServiceProvider>
      );
    });
    const footer = screen.getByText('GitHub');

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('href', 'https://github.com/quterma');
  });
});
