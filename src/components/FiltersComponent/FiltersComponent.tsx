import { useState, useEffect, FC, ChangeEvent } from 'react';
import { TYPES, MODELS } from '../../constants/constants';
import { Filters, Model, Type } from '../../types/types';
import { useDataService } from '../../context/DataServiceContext';

export const FiltersComponent: FC = () => {
  const { updateFilters } = useDataService();

  const [type, setType] = useState<Type>();
  const [model, setModel] = useState<Model>();

  useEffect(() => {
    updateFilters({ type, model });
  }, [type, model, updateFilters]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as Filters['type'];
    setType(newType || undefined);
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value as Filters['model'];
    setModel(newModel || undefined);
  };

  return (
    <div className="space-y-6">
      <SelectField
        id="type"
        label="Type"
        value={type || ''}
        options={[...TYPES]}
        onChange={handleTypeChange}
      />
      <SelectField
        id="model"
        label="Model"
        value={model || ''}
        options={[...MODELS]}
        onChange={handleModelChange}
      />
    </div>
  );
};

const SelectField: FC<{
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ id, label, value, options, onChange }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 over:border-gray-400 cursor-pointer transition-all duration-300 ease-in-out"
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
