import { render, screen } from '@testing-library/react';
import { Graph } from './Graph';

describe('Graph', () => {
  it('renders Graph component', () => {
    render(<Graph />);
    expect(screen.getByText(/Graph Component/i)).toBeInTheDocument();
  });
});
