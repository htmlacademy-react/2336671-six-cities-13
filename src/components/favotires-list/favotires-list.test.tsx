import { render, screen } from '@testing-library/react';
import FavoritesList from './favotires-list';
import { getFakeFavorite } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: favorites-list', () => {
  it('Should render correct', () => {

    const fakeFavoriteOffer = getFakeFavorite();
    const city = fakeFavoriteOffer.city;
    const favorites = [fakeFavoriteOffer];
    const favoritesPlacesContainerTestId = 'favorites-places-container';
    const { withStoreComponent } = withStore(<FavoritesList city={city.name} favoriteOffers={favorites}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const favoritesPlacesContainer = screen.getByTestId(favoritesPlacesContainerTestId);

    expect(favoritesPlacesContainer).toBeInTheDocument();
    expect(favoritesPlacesContainer.childElementCount).toBe(favorites.length);
  });
});
