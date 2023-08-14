import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import FavoriteCard from '../../components/favorite-card/favorite-card';

function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector((store) => store.favorites);
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

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
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>}
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
