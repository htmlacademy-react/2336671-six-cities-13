import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import { AppRoute } from '../../const';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen placesCount={placesCount} />} />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Favorites} element={<FavoritesScreen />} />
        <Route path={AppRoute.Offer} element={<OfferScreen/>} />
        <Route path={AppRoute.Other} element={<PageNotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
