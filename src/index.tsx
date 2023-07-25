import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { shortOffers } from './mocks/offers';
import { reviewsMocks } from './mocks/reviews';
import { offerDetails } from './mocks/offerDetails';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={shortOffers} reviews={reviewsMocks} offerDetails={offerDetails}/>
  </React.StrictMode>
);
