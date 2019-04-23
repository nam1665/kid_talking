import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import rootSagas from 'src/business/sagas';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import reducers from 'src/business/reducers';
import DevTools from 'src/core/DevTools';
import Request from 'src/helpers/Request';

const sagaMiddleware = createSagaMiddleware({});
const middlewares = [reduxImmutableStateInvariant(), sagaMiddleware, thunk];

export default initialState => {
    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../../business/reducers', () => {
            const nextRootReducer = require('../../business/reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSagas);
        Request.setupInterceptors(store);
    };

    // Run saga
    store.runSagaTask();
    store.close = () => store.dispatch(END);

    return store;
};
