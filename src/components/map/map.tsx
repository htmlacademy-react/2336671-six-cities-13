import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import useMap from './useMap';
import { City, ShortOffer } from '../../types/offer';

import 'leaflet/dist/leaflet.css';
import { MapType } from '../../const';
import type { OfferDetails } from '../../types/offer-details';

const URL_DEFAULT_MARKER = 'markup/img/pin.svg';
const URL_CURRENT_MARKER = 'markup/img/pin-active.svg';

type MapProps = {
  city: City;
  offers: ShortOffer[];
  currentCity?: OfferDetails;
  hoveredCityId: string;
  mapType: MapType;
}


function Map({city, offers, currentCity, hoveredCityId, mapType}: MapProps): JSX.Element {
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
      if (currentCity) {
        leaflet.marker({
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        }, {
          icon: hoveredCityId ? defaultMarker : currentMarker,
        }).addTo(map);
      }

      offers.forEach((point) => {

        leaflet.marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }, {
          icon: (hoveredCityId === point.id) ? currentMarker : defaultMarker,
        }).addTo(map);

      });
    }
  }, [currentCity, currentMarker, defaultMarker, hoveredCityId, map, offers]);

  return (
    <section
      className={`${mapType}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
