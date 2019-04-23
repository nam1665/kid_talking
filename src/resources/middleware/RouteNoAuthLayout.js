import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RouteData from 'src/helpers/Route';
import { stateSelector } from 'src/modules/account/redux/selectors';

const RouteNoAuthLayout = ({ component: Component, layout: Layout, auth, routes, ...rest }) => {
    return (
        <Route
            {...rest}
            render={renderProps => {
                const { isAuthenticated } = auth;
                if (isAuthenticated) {
                    return <Redirect to={RouteData.home} />;
                }
                if (!Component) {
                    return null;
                }
                return Layout ? (
                    <Layout {...renderProps}>
                        {Component ? <Component {...renderProps} routes={routes} /> : null}
                    </Layout>
                ) : (
                    <Component {...renderProps} routes={routes} />
                );
            }}
        />
    );
};

RouteNoAuthLayout.defaultProps = {
    layout: undefined
};

RouteNoAuthLayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    auth: PropTypes.object.isRequired,
    routes: PropTypes.array
};

/**
 *
 * @param {RootStateProps} state
 */
const mapStateToProps = state => {
    return {
        auth: stateSelector(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteNoAuthLayout);
