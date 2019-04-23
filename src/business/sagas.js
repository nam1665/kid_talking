import { all } from 'redux-saga/effects';
import _ from 'lodash';
import commonSaga from 'src/modules/common/redux/sagas';
import accountSaga from 'src/modules/account/redux/sagas';

export default function*() {
    yield all(_.flattenDeep([commonSaga, accountSaga]));
}
