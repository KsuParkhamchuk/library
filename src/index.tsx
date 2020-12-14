import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/init';
import { Provider } from 'react-redux';


const store = configureStore()


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
