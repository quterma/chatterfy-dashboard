import {
  useState,
  useEffect,
  useRef,
  FC,
  ChangeEvent,
  useCallback,
} from 'react';
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
    <div className="flex sm:flex-row md:flex-col flex-col gap-5">
      <CustomSelectField
        id="type"
        label="Type"
        value={type || ''}
        options={[...TYPES]}
        onChange={handleTypeChange}
      />
      <CustomSelectField
        id="model"
        label="Model"
        value={model || ''}
        options={[...MODELS]}
        onChange={handleModelChange}
      />
    </div>
  );
};

const CustomSelectField: FC<{
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ id, label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeOptions = () => setIsOpen(false);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeOptions();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={ref} className="relative w-full md:w-auto">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-400 ease-in-out flex justify-between items-center`}
        onClick={toggleOpen}
      >
        <span>{value || `All ${label}s`}</span>
        <span
          className={`transition-transform duration-400 inline-block w-2 h-2 border-t-2 border-r-2 border-gray-500 ${
            isOpen ? '-rotate-45' : '-rotate-[225deg]'
          }`}
        ></span>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-all duration-400 ease-in-out">
          <ul>
            <li
              key="all"
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange({
                  target: { value: '' },
                } as ChangeEvent<HTMLSelectElement>);
                closeOptions();
              }}
            >
              All {label}s
            </li>
            {options.map((option) => (
              <li
                key={option}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange({
                    target: { value: option },
                  } as ChangeEvent<HTMLSelectElement>);
                  closeOptions();
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
