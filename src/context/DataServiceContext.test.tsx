import { renderHook, act } from '@testing-library/react';
import { render } from '@testing-library/react';
import { DataServiceProvider, useDataService } from './DataServiceContext';
import { Filters } from '../types/types';

describe('DataServiceContext', () => {
  it('provides graphData through context', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataServiceProvider>{children}</DataServiceProvider>
    );

    const { result } = renderHook(() => useDataService(), { wrapper });

    const testFilters: Filters = { type: 'first', model: 'model1' };

    await act(async () => {
      result.current.updateFilters(testFilters);
    });

    expect(result.current.graphData).toBeDefined();
    expect(Array.isArray(result.current.graphData)).toBe(true);
    expect(result.current.graphData.slice(0, 2)).toHaveLength(2);
  });

  it('throws an error when used outside of provider', () => {
    const TestComponent = () => {
      useDataService();
      return null;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useDataService must be used within a DataServiceProvider');
  });
});
