import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import rootSagas from 'src/business/sagas';
import commonMiddleware from 'src/core/middleware/common';

import reducers from 'src/business/reducers';
import Request from 'src/helpers/Request';

const sagaMiddleware = createSagaMiddleware({});
const middlewares = [commonMiddleware, sagaMiddleware, thunk];

export default initialState => {
    const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSagas);
        Request.setupInterceptors(store);
    };

    // Run saga
    store.runSagaTask();
    store.close = () => store.dispatch(END);
    return store;
};
