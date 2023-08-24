import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthStatus } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('Should render component for public route, when user not authorized', () => {
    const authStatus = AuthStatus.NoAuth;
    const expectedText = 'Public Route';
    const notExpectedText = 'Private Route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authStatus={authStatus}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>, mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Should render component for private route, when user authorized', () => {
    const authStatus = AuthStatus.Auth;
    const expectedText = 'Private Route';
    const notExpectedText = 'Public Route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authStatus={authStatus}>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>, mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
