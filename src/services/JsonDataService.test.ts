import { JsonDataService } from './JsonDataService';
import { Usage, Cost, GraphData, CostsRecord } from '../types/types';

const mockUsages: Usage[] = [
  {
    type: 'first',
    model: 'model1',
    created_at: '2024-01-01',
    usage_input: 10,
    usage_output: 5,
  },
  {
    type: 'first',
    model: 'model1',
    created_at: '2024-01-01',
    usage_input: 15,
    usage_output: 10,
  },
  {
    type: 'second',
    model: 'model1',
    created_at: '2024-01-02',
    usage_input: 20,
    usage_output: 15,
  },
  {
    type: 'second',
    model: 'model2',
    created_at: '2024-01-02',
    usage_input: 25,
    usage_output: 20,
  },
  {
    type: 'third',
    model: 'model2',
    created_at: '2024-01-03',
    usage_input: 30,
    usage_output: 25,
  },
  {
    type: 'third',
    model: 'model3',
    created_at: '2024-01-03',
    usage_input: 35,
    usage_output: 30,
  },
  {
    type: 'first',
    model: 'model3',
    created_at: '2024-01-04',
    usage_input: 40,
    usage_output: 35,
  },
  {
    type: 'second',
    model: 'model3',
    created_at: '2024-01-04',
    usage_input: 45,
    usage_output: 40,
  },
  {
    type: 'third',
    model: 'model1',
    created_at: '2024-01-05',
    usage_input: 50,
    usage_output: 45,
  },
  {
    type: 'first',
    model: 'model2',
    created_at: '2024-01-05',
    usage_input: 55,
    usage_output: 50,
  },
  // Дублируем данные для проверки агрегации
  {
    type: 'first',
    model: 'model1',
    created_at: '2024-01-01',
    usage_input: 5,
    usage_output: 2,
  },
  {
    type: 'second',
    model: 'model2',
    created_at: '2024-01-02',
    usage_input: 10,
    usage_output: 5,
  },
  {
    type: 'third',
    model: 'model3',
    created_at: '2024-01-03',
    usage_input: 15,
    usage_output: 10,
  },
  {
    type: 'first',
    model: 'model3',
    created_at: '2024-01-04',
    usage_input: 20,
    usage_output: 15,
  },
  {
    type: 'third',
    model: 'model2',
    created_at: '2024-01-03',
    usage_input: 25,
    usage_output: 20,
  },
  {
    type: 'first',
    model: 'model1',
    created_at: '2024-01-01',
    usage_input: 30,
    usage_output: 25,
  },
  {
    type: 'second',
    model: 'model3',
    created_at: '2024-01-04',
    usage_input: 35,
    usage_output: 30,
  },
  {
    type: 'third',
    model: 'model1',
    created_at: '2024-01-05',
    usage_input: 40,
    usage_output: 35,
  },
  {
    type: 'second',
    model: 'model1',
    created_at: '2024-01-02',
    usage_input: 45,
    usage_output: 40,
  },
];

const mockCosts: Cost[] = [
  { model: 'model1', input: 2, output: 3 },
  { model: 'model2', input: 1.5, output: 2.5 },
  { model: 'model3', input: 1, output: 2 },
];

describe('JsonDataService', () => {
  let dataService: JsonDataService;

  beforeEach(() => {
    dataService = new JsonDataService(mockUsages, mockCosts);
  });

  describe('fetchData', () => {
    it('should return all usages when no filters are applied', async () => {
      const result = await dataService.fetchData({});

      expect(result).toEqual(mockUsages);
    });

    it('should filter usages by type', async () => {
      const result = await dataService.fetchData({ type: 'first' });

      expect(result.every((usage) => usage.type === 'first')).toBeTruthy();
    });

    it('should filter usages by model', async () => {
      const result = await dataService.fetchData({ model: 'model1' });

      expect(result.every((usage) => usage.model === 'model1')).toBeTruthy();
    });

    it('should filter usages by both type and model', async () => {
      const result = await dataService.fetchData({
        type: 'first',
        model: 'model1',
      });

      expect(
        result.every(
          (usage) => usage.type === 'first' && usage.model === 'model1'
        )
      ).toBeTruthy();
    });
  });

  describe('aggregateData', () => {
    const mockCostsRecord = mockCosts.reduce((acc, cost) => {
      acc[cost.model] = { input: cost.input, output: cost.output };
      return acc;
    }, {} as CostsRecord);

    it('should aggregate data by date', () => {
      const result: GraphData[] = dataService.aggregateData(mockUsages);

      expect(result).toEqual([
        { date: '2024-01-01', total_cost: 246 },
        { date: '2024-01-02', total_cost: 410 },
        { date: '2024-01-03', total_cost: 325 },
        { date: '2024-01-04', total_cost: 380 },
        { date: '2024-01-05', total_cost: 627.5 },
      ]);

      result.forEach(({ date, total_cost }) => {
        const expectedTotalCost = mockUsages
          .filter((usage) => usage.created_at === date)
          .reduce((sum, usage) => {
            const costs = mockCostsRecord[usage.model];
            return (
              sum +
              costs.input * usage.usage_input +
              costs.output * usage.usage_output
            );
          }, 0);

        expect(total_cost).toEqual(expectedTotalCost);
      });
    });
  });
});
