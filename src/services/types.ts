export type Type = 'first' | 'second' | 'third';

export type Model = 'model1' | 'model2' | 'model3';

export type Usage = {
  type: Type;
  model: Model;
  created_at: string;
  usage_input: number;
  usage_output: number;
};

export type Cost = {
  model: Model;
  input: number;
  output: number;
};

export type CostsRecord = Record<
  Model,
  {
    input: number;
    output: number;
  }
>;

export type Filters = {
  type?: Type;
  model?: Model;
};

export type GraphData = {
  date: string;
  total_cost: number;
};
