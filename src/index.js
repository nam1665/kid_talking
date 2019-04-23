import React from 'react';
import ReactDOM from 'react-dom';
import 'src/core/init/locale';
import './styles/main.scss';
import configureStore from './core/stores/configureStore';
import * as serviceWorker from './core/init/serviceWorker';

import history from 'src/core/init/history';
import Root from './core/Root';

const store = configureStore();

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));
serviceWorker.unregister();
