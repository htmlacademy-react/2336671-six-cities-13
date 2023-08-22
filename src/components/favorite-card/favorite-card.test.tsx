import { render, screen } from '@testing-library/react';
import { withHostory } from '../../utils/mock-component';
import { getFakeShortOffer } from '../../utils/mocks';
import FavoriteCard from './favorite-card';

describe('Component: Favorite card', () => {
  it('Should render correct', () => {
    const fakeOffer = getFakeShortOffer();
    const favoritesCardTestId = 'favorites-card';
    const preparedComponent = withHostory(<FavoriteCard offer={fakeOffer}/>);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesCardTestId)).toBeInTheDocument();
  });
});
