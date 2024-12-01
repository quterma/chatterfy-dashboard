import { createContext, useContext, FC } from 'react';
import { Cost, Usage } from '../services/types';
import { JsonDataService } from '../services/JsonDataService';
import usagesJson from '../data/usages.json';
import costsJson from '../data/costs.json';

const dataService = new JsonDataService(
  usagesJson as Usage[],
  costsJson as Cost[]
);

const DataServiceContext = createContext<JsonDataService | null>(null);

export const DataServiceProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DataServiceContext.Provider value={dataService}>
      {children}
    </DataServiceContext.Provider>
  );
};

export const useDataService = (): JsonDataService => {
  const context = useContext(DataServiceContext);

  if (!context) {
    throw new Error('useDataService must be used within a DataServiceProvider');
  }
  return context;
};
