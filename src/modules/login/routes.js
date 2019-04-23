import LoginLayout from 'src/resources/layout/Login';
import RouteNoAuthLayout from 'src/resources/middleware/RouteNoAuthLayout';
import LoginContainer from './pages/login';
import Route from 'src/helpers/Route';

export default [
    {
        path: Route.login,
        component: LoginContainer,
        exact: true,
        layout: LoginLayout,
        layoutMiddleware: RouteNoAuthLayout
    }
];
