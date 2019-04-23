import Layout from 'src/resources/layout/Main';
import AccountContainer from './pages/index';
import RoutePrivateLayout from 'src/resources/middleware/RoutePrivateLayout';

export default [
    {
        path: '/account/settings',
        component: AccountContainer,
        layout: Layout,
        layoutMiddleware: RoutePrivateLayout
    }
];
