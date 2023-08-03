import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { reviewsMocks } from './mocks/reviews';
import { offerDetails } from './mocks/offerDetails';
import { Provider } from 'react-redux';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviewsMocks} offerDetails={offerDetails}/>
    </Provider>
  </React.StrictMode>
);
