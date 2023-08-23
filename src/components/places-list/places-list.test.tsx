import { render, screen } from '@testing-library/react';
import { getFakeShortOffer } from '../../utils/mocks';
import PlacesList from './places-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthStatus } from '../../const';

describe('Component: pplacec-list', () => {
  it('Should render correct', () => {
    const placeListContainer = 'places-list-container';
    const fakePlacesList = [getFakeShortOffer()];
    const initialState = {
      USER: {
        authStatus: AuthStatus.Auth,
        userInfo: null
      },
    };
    const { withStoreComponent } = withStore(<PlacesList shortOffers={fakePlacesList} />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(placeListContainer)).toBeInTheDocument();
  });
});
