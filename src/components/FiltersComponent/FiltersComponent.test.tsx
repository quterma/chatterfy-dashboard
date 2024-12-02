import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersComponent } from './FiltersComponent';
import * as DataServiceContext from '../../context/DataServiceContext'; // Импортируем модуль напрямую

jest.mock('../../context/DataServiceContext');

const mockUpdateFilters = jest.fn();

describe('FiltersComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (DataServiceContext.useDataService as jest.Mock).mockReturnValue({
      updateFilters: mockUpdateFilters,
    });
  });

  it('calls updateFilters when a type is selected', () => {
    render(<FiltersComponent />);

    const typeSelect = screen.getByText(/all types/i);
    fireEvent.click(typeSelect);
    const option = screen.getByText(/first/i);
    fireEvent.click(option);

    expect(mockUpdateFilters).toHaveBeenCalledWith({
      type: 'first',
      model: undefined,
    });
  });

  it('calls updateFilters when a model is selected', () => {
    render(<FiltersComponent />);

    const modelSelect = screen.getByText(/all models/i);
    fireEvent.click(modelSelect);
    const option = screen.getByText(/model1/i);
    fireEvent.click(option);

    expect(mockUpdateFilters).toHaveBeenCalledWith({
      type: undefined,
      model: 'model1',
    });
  });

  it('closes dropdown when clicking outside', () => {
    render(<FiltersComponent />);

    const typeSelect = screen.getByText(/all types/i);
    fireEvent.click(typeSelect);
    expect(screen.getByText(/first/i)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(/first/i)).not.toBeInTheDocument();
  });
});
