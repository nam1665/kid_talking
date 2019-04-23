import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import LayoutDefault from 'src/resources/layout';

const RouteWithSubRoutes = ({ layoutMiddleware: Middleware, redirect, ...route }) => {
    if (redirect) {
        return <Redirect from={route.path} to={redirect} />;
    } else {
        if (Middleware) {
            return <Middleware {...route} />;
        } else {
            const { component: Component, layout: Layout, routes, ...rest } = route;
            return (
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
        }
    }
};

RouteWithSubRoutes.defaultProps = {
    layout: undefined
};

export default RouteWithSubRoutes;
