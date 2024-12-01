import { render, screen } from '@testing-library/react';
import { Filters } from './Filters';

describe('Filters', () => {
  it('renders Filters component', () => {
    render(<Filters />);
    expect(screen.getByText(/Filters Component/i)).toBeInTheDocument();
  });
});
