import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { getFakeShortOffer } from '../../utils/mocks';
import PlaceCardMemo from './place-card';
import { AuthStatus } from '../../const';

describe('Component: Favorite card', () => {
  it('Should render correct', () => {
    const fakeOffer = getFakeShortOffer();
    const placeCardTestId = 'place-card-container';
    const initialState = {
      USER: {
        authStatus: AuthStatus.Auth,
        userInfo: null
      }
    };
    const { withStoreComponent } = withStore(<PlaceCardMemo shortOffer={fakeOffer}/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(placeCardTestId)).toBeInTheDocument();
  });
});
