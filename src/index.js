import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import './index.css';
import {allCoins} from "./coins";

ReactDOM.render(<App allCoins={allCoins} perPage={12}/>, document.getElementById('container'));
registerServiceWorker();