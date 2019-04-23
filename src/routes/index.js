import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Router } from 'react-router-dom';
import Route from 'src/helpers/Route';
import RouteWithSubRoutes from 'src/core/init/RouteWithSubRoutes';

// Error pages
import Page404 from 'src/resources/common/error-pages/404';
import Page403 from 'src/resources/common/error-pages/403';
import Page500 from 'src/resources/common/error-pages/500';

import routes from './routes';
import { RoutePrivateLayout, RoutePublicLayout } from 'src/resources/middleware';

const AppRouter = ({ history }) => {
    return (
        <Router history={history}>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <RoutePublicLayout path={Route.page404} component={Page404} />
                <RoutePrivateLayout path={Route.page403} component={Page403} />
                <RoutePublicLayout path={Route.page500} component={Page500} />
                <Redirect from="*" to={Route.page404} />
            </Switch>
        </Router>
    );
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired
};
export default AppRouter;
