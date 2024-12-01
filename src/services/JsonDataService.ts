import { DataServiceInterface } from './DataServiceInterface';
import { Filters, Usage, Cost, CostsRecord, GraphData } from './types';

export class JsonDataService implements DataServiceInterface {
  private usages: Usage[];
  private costs: CostsRecord;

  constructor(usagesJson: Usage[], costsJson: Cost[]) {
    this.usages = usagesJson;
    this.costs = costsJson.reduce((acc, cost) => {
      acc[cost.model] = { input: cost.input, output: cost.output };
      return acc;
    }, {} as CostsRecord);
  }

  async fetchData({ type, model }: Filters): Promise<Usage[]> {
    return this.usages.filter(
      (usage) =>
        (!type || usage.type === type) && (!model || usage.model === model)
    );
  }

  aggregateData(data: Usage[]): GraphData[] {
    const aggregated = data.reduce<Record<string, number>>((acc, usage) => {
      const date = usage.created_at;
      const modelCosts = this.costs[usage.model];
      const totalCost =
        (modelCosts.input || 0) * usage.usage_input +
        (modelCosts.output || 0) * usage.usage_output;

      acc[date] = (acc[date] || 0) + totalCost;
      return acc;
    }, {});

    return Object.entries(aggregated).map(([date, total_cost]) => ({
      date,
      total_cost,
    }));
  }
}
