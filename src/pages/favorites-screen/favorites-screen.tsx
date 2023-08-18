import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import FavoritesListGroup from '../../components/favorites-list-group/favorites-list-group';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { getFavorites } from '../../store/data-process/data-process.selectors';
import HeaderMemo from '../../components/header/header';

function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavorites);

  return (
    <div className={favoriteOffers.length ? 'page' : 'page page--favorites-empty'}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <HeaderMemo />
      {favoriteOffers.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesListGroup favoriteOffers={favoriteOffers} />
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty />}
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
