import PlacesList from '../../components/places-list/places-list';
import Header from '../../components/header/header';

import type { ShortOffer } from '../../mocks/offers';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { SortType } from '../../const';

type MainScreenProps = {
  offers: ShortOffer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {

  const [isSortOpen, setSortOpen] = useState(false);
  const [currentSortType, setCurrentSortType] = useState('Popular');

  const sortClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isSortOpen,
  });

  function handleSortClick() {
    setSortOpen((current) => !current);
  }

  function Sort(): JSX.Element {
    return (
      <Fragment>
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
      </Fragment>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
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
                <ul className={sortClass}>
                  <Sort />
                </ul>
              </form>
              <PlacesList shortOffers={offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
