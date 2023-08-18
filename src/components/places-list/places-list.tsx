
import type { ShortOffer } from '../../types/offer';
import PlaceCardMemo from '../place-card/place-card';

type PlacesListProps = {
  shortOffers: ShortOffer[];
  setCityId?: (id: string) => void;
}

function PlacesList({shortOffers, setCityId}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {shortOffers.map((value) => (
        <PlaceCardMemo
          key={value.id}
          shortOffer={value}
          setCityId={setCityId}
        />
      ))}
    </div>
  );
}

export default PlacesList;
