import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoritesListGroup from './favorites-list-group';
import { getFakeFavorite } from '../../utils/mocks';

describe('Component: Favorites List Group', () => {
  it('Should render correct', () => {
    const favoritesListConteinerTestId = 'favorites-list-container';
    const fakeFavoritesList = [getFakeFavorite(), getFakeFavorite()];
    const { withStoreComponent } = withStore(<FavoritesListGroup favoriteOffers={fakeFavoritesList}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesListConteinerTestId)).toBeInTheDocument();
  });
});
