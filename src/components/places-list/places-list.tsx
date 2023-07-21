import PlaceCard from '../place-card/place-card';
import type { ShortOffer } from '../../types/offer';

type PlacesListProps = {
  shortOffers: ShortOffer[];
  setCityId: React.Dispatch<React.SetStateAction<string>>;
}

function PlacesList({shortOffers, setCityId}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {shortOffers.map((value) => <PlaceCard key={value.id} shortOffer={value} setCityId={setCityId}/>)}
    </div>
  );
}

export default PlacesList;
