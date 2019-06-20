import MainLayout from 'src/resources/layout/Main';
import RoutePriveteLayout from 'src/resources/middleware/RoutePrivateLayout';
import HomeContainer from './pages/home';
import TestContainer from './pages/test/test';
// import TestLayout from './pages/test/test'
// import DevContainer from './pages/dev';
import Route from 'src/helpers/Route';

export default [
    {
        path: Route.home,
        component: HomeContainer,
        exact: true,
        layout: MainLayout,
        layoutMiddleware: RoutePriveteLayout
    },
    {
        path: Route.test,
        component: TestContainer,
        exact: true,
        layout: MainLayout,
        layoutMiddleware: RoutePriveteLayout
    },
    // {
    //     path: Route.test,
    //     component: TestLayout,
    //     exact: true,
    //     layout: MainLayout,
    //     layoutMiddleware: RoutePriveteLayout
    // }
    // {
    //     path: '/dev',
    //     component: DevContainer,
    //     exact: true,
    //     layout: MainLayout,
    //     layoutMiddleware: RoutePriveteLayout
    // }
];
