import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthStatus } from '../../const';

import type { ShortOffer } from '../../mocks/offers';
import type { ReviewComment } from '../../mocks/reviews';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppScreenProps = {
  offers: ShortOffer[];
  reviews: ReviewComment[];
}

function App({offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferScreen reviews={reviews}/>} />
        <Route path={AppRoute.Other} element={<PageNotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
