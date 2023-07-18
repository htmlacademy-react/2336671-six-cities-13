import PlaceCard from '../place-card/place-card';
import type { ShortOffer } from '../../mocks/offers';

type PlacesListProps = {
  shortOffers: ShortOffer[];
}

function PlacesList({shortOffers}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {shortOffers.map((value) => <PlaceCard key={value.id} shortOffer={value}/>)}
    </div>
  );
}

export default PlacesList;
