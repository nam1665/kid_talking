import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RouteData from 'src/helpers/Route';

const PrivateRoute = ({ component: Component, layout: Layout, auth, routes, ...rest }) => {
    return (
        <Route
            {...rest}
            render={renderProps => {
                const { location } = renderProps;
                const { isAuthenticated } = auth;
                if (!isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: RouteData.login,
                                state: { from: renderProps.location },
                                query: {
                                    redirect: location.pathname
                                }
                            }}
                        />
                    );
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

PrivateRoute.defaultProps = {
    layout: undefined
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    auth: PropTypes.object.isRequired,
    routes: PropTypes.array
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
