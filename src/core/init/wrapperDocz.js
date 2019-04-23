import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import 'src/core/locale';
import ConnectedLocaleProvider from '../containers/ConnectedLocaleProvider';
import ConnectedIntlProvider from '../containers/ConnectedIntlProvider';
import configureStore from '../stores/configureStore';

import './../../styles/main.scss';

const store = configureStore();

const Root = ({ children }) => {
    return (
        <Provider store={store}>
            <ConnectedLocaleProvider>
                <ConnectedIntlProvider>{children}</ConnectedIntlProvider>
            </ConnectedLocaleProvider>
        </Provider>
    );
};

Root.propTypes = {
    children: PropTypes.any
};

export default Root;
