import PlacesList from '../../components/places-list/places-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { MapType } from '../../const';

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import Cities from '../../components/cities/cities';
import Sort from '../../components/sort/sort';
import { sortOffers } from '../../utils/common';

function MainScreen(): JSX.Element {

  const city = useAppSelector((store) => store.city);
  const offers = useAppSelector((store) => store.offers);
  const sortType = useAppSelector((store) => store.sort);
  const sortedOffers = sortOffers(offers, sortType);

  const [hoveredCityId, setHoveredCityId] = useState('');

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
              <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
              <Sort />
              <PlacesList shortOffers={sortedOffers} setCityId={setHoveredCityId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={sortedOffers[0].city}
                offers={sortedOffers}
                hoveredPlaceId={hoveredCityId} mapType={MapType.Cities}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
