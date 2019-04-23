import img403 from './assets/403.svg';
import img404 from './assets/404.svg';
import img500 from './assets/500.svg';
const config = {
    403: {
        img: img403,
        title: '403',
        desc: `Sorry, you don't have access to this page`
    },
    404: {
        img: img404,
        title: '404',
        desc: `Sorry, the page you visited does not exist`
    },
    500: {
        img: img500,
        title: '500',
        desc: `Sorry, the server is reporting an error`
    }
};

export default config;
