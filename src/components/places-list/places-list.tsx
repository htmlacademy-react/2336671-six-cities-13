import PlaceCard from '../place-card/place-card';
import type { Offer } from '../../mocks/offers';

type PlacesListProps = {
  offersMocks: Offer[];
}

function PlacesList({offersMocks}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMocks.map((value) => <PlaceCard key={value.id} offer={value}/>)}
    </div>
  );
}

export default PlacesList;
