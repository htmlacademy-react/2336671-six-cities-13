import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import FavoritesListGroup from '../../components/favorites-list-group/favorites-list-group';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector((store) => store.favorites);

  return (
    <div className={favoriteOffers.length ? 'page' : 'page page--favorites-empty'}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
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
