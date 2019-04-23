import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RoutePublicLayout = ({ component: Component, layout: Layout, routes, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Layout ? (
                <Layout {...props}>{Component ? <Component {...props} routes={routes} /> : null}</Layout>
            ) : Component ? (
                <Component {...props} routes={routes} />
            ) : null
        }
    />
);

RoutePublicLayout.defaultProps = {
    layout: undefined
};

RoutePublicLayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    routes: PropTypes.array
};

export default RoutePublicLayout;
