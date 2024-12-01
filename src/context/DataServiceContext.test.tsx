import { render } from '@testing-library/react';
import { DataServiceProvider, useDataService } from './DataServiceContext';

describe('DataServiceContext', () => {
  it('should provide JsonDataService instance via context', () => {
    const TestComponent = () => {
      const dataService = useDataService();
      expect(dataService).toBeDefined();
      return null;
    };

    const { container } = render(
      <DataServiceProvider>
        <TestComponent />
      </DataServiceProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it('should throw error if useDataService is used outside provider', () => {
    const TestComponent = () => {
      useDataService();
      return null;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useDataService must be used within a DataServiceProvider');
  });
});
