import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { SNACKBAR_FEATURE_KEY, snackbarReducer } from '@evan-dev/snackbar';
import { GALLERY_FEATURE_KEY, galleryReducer } from '@evan-dev/gallery';
import { SIDE_PANEL_FEATURE_KEY, sidePanelReducer } from '@evan-dev/side-panel';

const store = configureStore({
  reducer: {
    [SIDE_PANEL_FEATURE_KEY]: sidePanelReducer,
    [GALLERY_FEATURE_KEY]: galleryReducer,
    [SNACKBAR_FEATURE_KEY]: snackbarReducer
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
