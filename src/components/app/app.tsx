import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import { AppRoute, AuthStatus } from '../../const';

import PrivateRoute from '../private-route/private-route';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import type { ShortOffer } from '../../types/offer';
import type { ReviewComment } from '../../types/review';
import type { OfferDetails } from '../../types/offer-details';

type AppScreenProps = {
  offers: ShortOffer[];
  reviews: ReviewComment[];
  offerDetails: OfferDetails;
}

function App({offers, reviews, offerDetails}: AppScreenProps): JSX.Element {

  return (
    <HelmetProvider>
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
          <Route path={AppRoute.Offer} element={<OfferScreen reviews={reviews} offerDetails={offerDetails} nearbyPlaces={offers}/>} />
          <Route path={AppRoute.Other} element={<PageNotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
