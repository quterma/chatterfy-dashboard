import { Filters, GraphData, Usage } from './types';

export interface DataServiceInterface {
  fetchData(filters: Filters): Promise<Usage[]>;
  aggregateData(data: Usage[]): GraphData[];
}
