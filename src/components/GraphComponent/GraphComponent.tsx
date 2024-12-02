import { FC, useMemo } from 'react';
import { useDataService } from '../../context/DataServiceContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const GraphComponent: FC = () => {
  const { graphData } = useDataService();

  const yAxisDomain = useMemo(() => {
    if (graphData.length === 0) return [0, 100];

    const values = graphData.map((data) => data.total_cost);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const padding = range * 0.1;

    const adjustedMin = Math.floor((min - padding) / 100) * 100;
    const adjustedMax = Math.ceil((max + padding) / 100) * 100;

    return [adjustedMin, adjustedMax];
  }, [graphData]);

  return (
    <div className="w-full flex p-4 bg-white rounded shadow-md">
      <div className="flex-grow h-[30rem] pb-10">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Usage Analytics Over Time
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              label={{
                value: '',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={yAxisDomain}
              tickFormatter={(value) => value.toFixed(0)}
              label={{
                value: '',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)}`}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="total_cost"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
