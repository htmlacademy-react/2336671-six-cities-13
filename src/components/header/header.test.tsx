import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import HeaderMemo from './header';
import { AuthStatus } from '../../const';
import { getFakeShortOffer } from '../../utils/mocks';

describe('Component: Header', () => {
  it('Should render correct', () => {
    const headerTestId = 'header-container';
    const initialState = {
      USER: {
        authStatus: AuthStatus.Auth,
        userInfo: null
      },
      DATA: {
        offers: [],
        favorites: [getFakeShortOffer()],
        offerDetails: null,
        reviews: [],
        nearbyPlaces: [],
        isOffersLoading: false,
        isFavoritesLoading: false,
        isOfferDetailsLoading: false,
        isReviewsLoading: false,
        isNearbyPlacesLoading: false,
        hasError: false,
      }
    };
    const { withStoreComponent } = withStore(<HeaderMemo />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
