import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import _ from 'lodash';
import { stateSelector } from 'src/modules/language/redux/selectors';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
const mapStateToProps = state => {
    const { locale = 'en', data = {} } = stateSelector(state);
    const messages = _.get(data, locale, {});
    return { locale: locale, messages };
};

export default connect(
    mapStateToProps,
    () => ({})
)(IntlProvider);
