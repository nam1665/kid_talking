import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ConnectedIntlProvider from './containers/ConnectedIntlProvider';
import App from './App';

const Root = props => {
    const { store, history } = props;
    return (
        <Provider store={store}>
            <ConnectedIntlProvider>
                <App history={history} />
            </ConnectedIntlProvider>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;
