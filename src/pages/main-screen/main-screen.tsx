import PlacesList from '../../components/places-list/places-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { SortType, CitiesList, MapType } from '../../const';
import type { ShortOffer } from '../../types/offer';

import classNames from 'classnames';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

type MainScreenProps = {
  offers: ShortOffer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {

  const [isSortOpen, setSortOpen] = useState(false);
  const [currentSortType, setCurrentSortType] = useState('Popular');
  const [city, setCity] = useState('Paris');
  const [hoveredCityId, setHoveredCityId] = useState('');

  const sortClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isSortOpen,
  });

  function handleSortClick() {
    setSortOpen((current) => !current);
  }

  function Cities(): JSX.Element {
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CitiesList.map((value) => (
              <li className="locations__item" key={value} onClick={() => {
                setCity(value);
              }}
              >
                <Link className={`locations__item-link tabs__item ${city === value ? 'tabs__item--active' : ''}`} to="#">
                  <span>{value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  function Sort(): JSX.Element {
    return (
      <ul className={sortClass}>
        {SortType.map((value) => (
          <li
            key={value}
            className={`places__option ${currentSortType === value ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              setCurrentSortType(value);
              setSortOpen((current) => !current);
            }}
          >{value}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Cities />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0} onClick={handleSortClick}>
                  {currentSortType}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <Sort />
              </form>
              <PlacesList shortOffers={offers} setCityId={setHoveredCityId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={offers[0].city}
                offers={offers}
                hoveredCityId={hoveredCityId} mapType={MapType.Cities}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
