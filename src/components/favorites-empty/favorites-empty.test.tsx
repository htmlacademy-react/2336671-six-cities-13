import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: favorites-empty', () => {
  it('Should render correct', () => {
    const expectedText = 'Nothing yet saved.';

    render(<FavoritesEmpty/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
