import { Link } from 'react-router-dom';
import FavoritesList from '../favorites-list/favorites-list';
import { Favorite } from '../../types/favorite';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-process/app-process.slice';

type FavoritesListGroupProps = {
  favoriteOffers: Favorite[];
}

function FavoritesListGroup ({favoriteOffers}: FavoritesListGroupProps): JSX.Element {

  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
  const dispatch = useAppDispatch();

  return (
    <ul className="favorites__list" data-testid="favorites-list-container">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" onClick={() => {
                dispatch(changeCity(city));
              }}
              >
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <FavoritesList city={city} favoriteOffers={favoriteOffers}/>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesListGroup;
