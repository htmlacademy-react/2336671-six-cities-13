import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersMocks } from './mocks/offers';
import { reviewsMocks } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offersMocks} reviews={reviewsMocks}/>
  </React.StrictMode>
);
