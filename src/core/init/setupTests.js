import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import rootSagas from 'src/business/sagas';

registerRequireContextHook();
const sagaMiddleware = createSagaMiddleware({});

configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

const middlewares = [sagaMiddleware];

const mockStore = configureMockStore(middlewares);
sagaMiddleware.run(rootSagas);

const mockAxios = new MockAdapter(axios);

export { mockStore, mockAxios };
