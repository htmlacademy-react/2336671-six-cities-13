import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import useMap from '../../hooks/useMap';
import { City, ShortOffer } from '../../types/offer';

import 'leaflet/dist/leaflet.css';
import { MapType } from '../../const';
import type { OfferDetails } from '../../types/offer-details';

const URL_DEFAULT_MARKER = 'markup/img/pin.svg';
const URL_CURRENT_MARKER = 'markup/img/pin-active.svg';

type MapProps = {
  city: City;
  offers: ShortOffer[];
  currentPlace?: OfferDetails;
  hoveredPlaceId?: string;
  mapType: MapType;
}


function Map({city, offers, currentPlace, hoveredPlaceId, mapType}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultMarker = leaflet.icon({
    iconUrl: URL_DEFAULT_MARKER,
    iconSize: [28, 39],
    iconAnchor: [14, 39],
  });

  const currentMarker = leaflet.icon({
    iconUrl: URL_CURRENT_MARKER,
    iconSize: [28, 39],
    iconAnchor: [14, 39],
  });

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      if (currentPlace) {
        leaflet.marker({
          lat: currentPlace.location.latitude,
          lng: currentPlace.location.longitude,
        }, {
          icon: currentMarker,
        }).addTo(map);
      }

      offers.forEach((point) => {

        leaflet.marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }, {
          icon: (hoveredPlaceId === point.id && mapType === MapType.Cities) ? currentMarker : defaultMarker,
        }).addTo(map);

      });
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom, currentMarker, currentPlace, defaultMarker, hoveredPlaceId, map, mapType, offers]);

  return (
    <section
      className={`${mapType}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
