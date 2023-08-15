import { Link } from 'react-router-dom';
import FavoritesList from '../favotires-list/favotires-list';
import { Favorite } from '../../types/favorite';

type FavoritesListGroupProps = {
  favoriteOffers: Favorite[];
}

function FavoritesListGroup ({favoriteOffers}: FavoritesListGroupProps): JSX.Element {

  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="">
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
