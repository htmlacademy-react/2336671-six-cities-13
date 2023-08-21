import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { MapType } from '../../const';

import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getSortedCityOffers } from '../../utils/common';
import MainEmpty from '../../components/main-empty/main-empty';
import classNames from 'classnames';
import { getCity, getSortType } from '../../store/app-process/app-process.selectors';
import { getError, getOffers } from '../../store/data-process/data-process.selectors';
import ErrorScreen from '../error-screen/error-screen';
import SortMemo from '../../components/sort/sort';
import CitiesMemo from '../../components/cities/cities';
import HeaderMemo from '../../components/header/header';

function MainScreen(): JSX.Element {

  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const sortType = useAppSelector(getSortType);
  const hasError = useAppSelector(getError);

  const currentCitySsortedOffers = getSortedCityOffers(city, offers, sortType);

  const [hoveredCityId, setHoveredCityId] = useState('');

  const handlePlaceCardHover = useCallback((id: string) => {
    setHoveredCityId(id);
  }, []);

  let mainClass = classNames('page page--gray', 'page--main');

  if (!currentCitySsortedOffers.length) {
    mainClass += ' page__main--index-empty';
  }

  if(hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <div className={mainClass}>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <HeaderMemo />
      <main className="page__main page__main--index ">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesMemo />
        <div className="cities">
          { currentCitySsortedOffers.length ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCitySsortedOffers.length} {currentCitySsortedOffers.length === 1 ? 'place' : 'places'} to stay in {city}</b>
                <SortMemo />
                <PlacesList shortOffers={currentCitySsortedOffers} setCityId={handlePlaceCardHover}/>
              </section>
              <div className="cities__right-section">
                <Map
                  city={currentCitySsortedOffers[0].city}
                  offers={currentCitySsortedOffers}
                  hoveredPlaceId={hoveredCityId}
                  mapType={MapType.Cities}
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
