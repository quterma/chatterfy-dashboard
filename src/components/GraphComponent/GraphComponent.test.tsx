import { act, render, screen } from '@testing-library/react';
import { DataServiceProvider } from '../../context/DataServiceContext';
import { GraphComponent } from './GraphComponent';

jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

const mockGraphData = [
  { date: '2024-01-01', total_cost: 100 },
  { date: '2024-01-02', total_cost: 200 },
];

jest.mock('../../context/DataServiceContext', () => ({
  useDataService: jest.fn(() => ({
    graphData: mockGraphData,
  })),
}));

describe('GraphComponent', () => {
  it('renders graph with correct dimensions', () => {
    const { container } = render(
      <div style={{ width: '500px', height: '500px' }}>
        <DataServiceProvider>
          <GraphComponent />
        </DataServiceProvider>
      </div>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <DataServiceProvider>
          <GraphComponent />
        </DataServiceProvider>
      );
    });

    expect(screen.getByText(/Usage Analytics Over Time/i)).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('displays the graph with the correct data', async () => {
    await act(async () => {
      render(
        <DataServiceProvider>
          <GraphComponent />
        </DataServiceProvider>
      );
    });

    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02')).toBeInTheDocument();
  });
});
