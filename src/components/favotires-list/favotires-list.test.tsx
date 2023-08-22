import { render, screen } from '@testing-library/react';
import FavoritesList from './favotires-list';
import { getFakeFavorite } from '../../utils/mocks';

describe('Component: favorites-list', () => {
  it('Should render correct', () => {

    const fakeFavoriteOffer = getFakeFavorite();
    const city = fakeFavoriteOffer.city;
    const favorites = [fakeFavoriteOffer, fakeFavoriteOffer];
    const favoritesPlacesContainerTestId = 'favorites-places-container';

    render(<FavoritesList city={city.name} favoriteOffers={favorites}/>);

    const favoritesPlacesContainer = screen.getByTestId(favoritesPlacesContainerTestId);

    expect(favoritesPlacesContainer).toBeInTheDocument();
    expect(favoritesPlacesContainer.childElementCount).toBe(favorites.length);
  });
});
