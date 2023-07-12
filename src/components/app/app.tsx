import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen placesCount={placesCount} />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/favorites' element={<FavoritesScreen />} />
        <Route path='/offer/:id' element={<OfferScreen/>} />
        <Route path='*' element={<PageNotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
