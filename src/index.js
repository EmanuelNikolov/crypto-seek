import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './containers/App';
import {searchCoins, requestCoins} from "./reducers";
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import './index.css';

const logger = createLogger();
const rootReducer = combineReducers({searchCoins, requestCoins});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();