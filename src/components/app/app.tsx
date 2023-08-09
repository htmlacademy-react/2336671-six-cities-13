import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import { AppRoute, AuthStatus } from '../../const';

import PrivateRoute from '../private-route/private-route';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import type { ReviewComment } from '../../types/review';
import type { OfferDetails } from '../../types/offer-details';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppScreenProps = {
  reviews: ReviewComment[];
  offerDetails: OfferDetails;
}

function App({reviews, offerDetails}: AppScreenProps): JSX.Element {

  const authStatus = useAppSelector((state) => state.authStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const currentOffers = useAppSelector((state) => state.offers);

  if (authStatus === AuthStatus.Unknown || isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen />} />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferScreen reviews={reviews} offerDetails={offerDetails} nearbyPlaces={currentOffers}/>} />
          <Route path={AppRoute.Other} element={<PageNotFoundScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
