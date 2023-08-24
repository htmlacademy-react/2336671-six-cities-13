import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Componetn: Main Empty', () => {
  it('Should render correct', () => {
    const city = 'Paris';
    const containText = 'We could not find any property available at the moment in Paris';

    render(<MainEmpty city={city} />);

    expect(screen.getByText(containText)).toBeInTheDocument();

  });
});
