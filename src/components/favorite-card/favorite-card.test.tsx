import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { getFakeShortOffer } from '../../utils/mocks';
import FavoriteCard from './favorite-card';

describe('Component: Favorite card', () => {
  it('Should render correct', () => {
    const fakeOffer = getFakeShortOffer();
    const favoritesCardTestId = 'favorites-card';
    const { withStoreComponent } = withStore(<FavoriteCard offer={fakeOffer}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesCardTestId)).toBeInTheDocument();
  });
});
