import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersComponent } from './FiltersComponent';
import { useDataService } from '../../context/DataServiceContext';

jest.mock('../../context/DataServiceContext', () => ({
  useDataService: jest.fn(),
}));

describe('FiltersComponent', () => {
  const mockUpdateFilters = jest.fn();

  beforeEach(() => {
    (useDataService as jest.Mock).mockReturnValue({
      updateFilters: mockUpdateFilters,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders type and model select fields', () => {
    render(<FiltersComponent />);

    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
  });

  it('calls updateFilters when type is changed', () => {
    render(<FiltersComponent />);

    const typeSelect = screen.getByLabelText(/Type/i);
    fireEvent.change(typeSelect, { target: { value: 'first' } });

    expect(mockUpdateFilters).toHaveBeenCalledWith({
      type: 'first',
      model: undefined,
    });
  });

  it('calls updateFilters when model is changed', () => {
    render(<FiltersComponent />);

    const modelSelect = screen.getByLabelText(/Model/i);
    fireEvent.change(modelSelect, { target: { value: 'model1' } });

    expect(mockUpdateFilters).toHaveBeenCalledWith({
      type: undefined,
      model: 'model1',
    });
  });

  it('calls updateFilters when both type and model are changed', () => {
    render(<FiltersComponent />);

    const typeSelect = screen.getByLabelText(/Type/i);
    const modelSelect = screen.getByLabelText(/Model/i);

    fireEvent.change(typeSelect, { target: { value: 'first' } });
    fireEvent.change(modelSelect, { target: { value: 'model1' } });

    expect(mockUpdateFilters).toHaveBeenLastCalledWith({
      type: 'first',
      model: 'model1',
    });
  });
});
