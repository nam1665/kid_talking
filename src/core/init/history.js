import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'query-string';

function makeHistory(history) {
    return qhistory(history, stringify, parse);
}

const history = createBrowserHistory();

export default makeHistory(history);
