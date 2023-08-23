import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthStatus, SortType } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  const loginComponent = withStore(<LoginScreen />);
  const preparedLoginComponent = withHistory(loginComponent.withStoreComponent);
  const favoritesCompopnent = withStore(<FavoritesScreen />);
  const preparedFavoritesComponent = withHistory(favoritesCompopnent.withStoreComponent);

  it('Should render component for public route, when user not authorized', () => {
    const authStatus = AuthStatus.NoAuth;
    const loginTestId = 'emailElement';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={
          <PrivateRoute authStatus={authStatus}>
            <span>{'test'}</span>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authStatus={authStatus}>
            <span>{'test'}</span>
          </PrivateRoute>
        }
        />
      </Routes>, mockHistory
    );

    render(preparedComponent);

    expect(screen.getByTestId(loginTestId)).not.toBeInTheDocument();
  });
});
