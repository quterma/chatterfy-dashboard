import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  FC,
  ReactNode,
} from 'react';
import { JsonDataService } from '../services/JsonDataService';
import usagesJson from '../data/usages.json';
import costsJson from '../data/costs.json';
import { Usage, Cost, Filters, GraphData } from '../types/types';

const dataService = new JsonDataService(
  usagesJson as Usage[],
  costsJson as Cost[]
);

interface DataServiceContextValue {
  graphData: GraphData[];
  updateFilters: (filters: Filters) => void;
}

const DataServiceContext = createContext<DataServiceContextValue | null>(null);

export const DataServiceProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>({});
  const [graphData, setGraphData] = useState<GraphData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = await dataService.fetchData(filters);
      const aggregatedData = dataService.aggregateData(filteredData);

      setGraphData(aggregatedData);
    };

    fetchData();
  }, [filters]);

  const updateFilters = useCallback((newFilters: Filters) => {
    setFilters((prevFilters) => {
      const hasChanged = Object.keys(newFilters).some(
        (key) =>
          prevFilters[key as keyof Filters] !== newFilters[key as keyof Filters]
      );
      return hasChanged ? newFilters : prevFilters;
    });
  }, []);

  return (
    <DataServiceContext.Provider value={{ graphData, updateFilters }}>
      {children}
    </DataServiceContext.Provider>
  );
};

export const useDataService = (): DataServiceContextValue => {
  const context = useContext(DataServiceContext);
  if (!context) {
    throw new Error('useDataService must be used within a DataServiceProvider');
  }
  return context;
};
