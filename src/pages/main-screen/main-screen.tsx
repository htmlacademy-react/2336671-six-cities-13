import PlacesList from '../../components/places-list/places-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { MapType } from '../../const';

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import Cities from '../../components/cities/cities';
import Sort from '../../components/sort/sort';
import { getSortedCityOffers } from '../../utils/common';
import MainEmpty from '../../components/main-empty/main-empty';
import classNames from 'classnames';

function MainScreen(): JSX.Element {

  const city = useAppSelector((store) => store.city);
  const offers = useAppSelector((store) => store.offers);
  const sortType = useAppSelector((store) => store.sort);

  const currentCitySsortedOffers = getSortedCityOffers(city, offers, sortType);

  const [hoveredCityId, setHoveredCityId] = useState('');

  let mainClass = classNames('page page--gray', 'page--main');

  if (!currentCitySsortedOffers.length) {
    mainClass += ' page__main--index-empty';
  }

  return (
    <div className={mainClass}>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index ">
        <h1 className="visually-hidden">Cities</h1>
        <Cities />
        <div className="cities">
          { currentCitySsortedOffers.length ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCitySsortedOffers.length} places to stay in {city}</b>
                <Sort />
                <PlacesList shortOffers={currentCitySsortedOffers} setCityId={setHoveredCityId}/>
              </section>
              <div className="cities__right-section">
                <Map
                  city={currentCitySsortedOffers[0].city}
                  offers={currentCitySsortedOffers}
                  hoveredPlaceId={hoveredCityId} mapType={MapType.Cities}
                />
              </div>
            </div>
            : <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
