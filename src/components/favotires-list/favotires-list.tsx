import { Favorite } from '../../types/favorite';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesListProps = {
  city: string;
  favoriteOffers: Favorite[];
}

function FavoritesList ({city, favoriteOffers}: FavoritesListProps):JSX.Element {
  return (
    <div className="favorites__places">
      {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}
    </div>
  );
}

export default FavoritesList;
