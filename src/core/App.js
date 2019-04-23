import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import * as commonAction from 'src/modules/common/redux/actions/common';
import AppRouter from 'src/routes';
import DevTools from 'src/core/DevTools';
import Loading from 'src/resources/common/Loading';

class App extends PureComponent {
    appendScript = (src, id) => {
        const fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        const js = document.createElement('script');
        js.id = id;
        js.src = src;
        fjs.parentNode.insertBefore(js, fjs);
    };

    componentDidMount() {
        const { commonActions } = this.props;
        commonActions.init();
    }

    render() {
        const { initSuccess, history } = this.props;

        return (
            <Fragment>
                <Helmet htmlAttributes={{ lang: 'en' }} defaultTitle="Kidtopi Kid" titleTemplate={`Kidtopi Kid - %s`} />

                {!initSuccess ? (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Loading loading={!initSuccess} />
                    </div>
                ) : (
                    <AppRouter history={history} />
                )}

                <DevTools />
            </Fragment>
        );
    }
}

App.propTypes = {
    initSuccess: PropTypes.bool,
    commonActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = ({ common }) => {
    const { init } = common;
    return {
        initSuccess: init.initSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        commonActions: bindActionCreators(commonAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
