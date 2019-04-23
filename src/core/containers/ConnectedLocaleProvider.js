import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import { stateSelector } from 'src/modules/language/redux/selectors';
import viVN from 'antd/lib/locale-provider/vi_VN';
import enUS from 'antd/lib/locale-provider/en_US';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
const setLocale = locale => {
    if (locale && locale !== moment.locale()) {
        moment.locale(locale);
    }
};
const mapStateToProps = state => {
    const { locale } = stateSelector(state);

    switch (locale) {
        case 'en':
        case 'en_US':
            setLocale('en');
            return { locale: enUS };
        case 'vi':
        case 'vi_VN':
            setLocale('vi');
            return { locale: viVN };
        default:
            setLocale('en');
            return { locale: enUS };
    }
};

export default connect(
    mapStateToProps,
    () => ({})
)(LocaleProvider);
