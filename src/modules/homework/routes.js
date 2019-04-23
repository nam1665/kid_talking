import MainLayout from 'src/resources/layout/Main';
import RoutePriveteLayout from 'src/resources/middleware/RoutePrivateLayout';
import HomeContainer from './pages/index';
import Route from 'src/helpers/Route';

export default [
    {
        path: Route.homework,
        component: HomeContainer,
        exact: true,
        layout: MainLayout,
        layoutMiddleware: RoutePriveteLayout
    }
];
