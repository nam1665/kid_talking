import reactApp from 'docz-plugin-react-app';

export default {
    title: 'QSoft Project',
    description: 'This is my awesome documentation',
    src: './src',
    wrapper: 'src/core/init/wrapperDocz',
    themeConfig: {
        mode: 'light',
        colors: {
            primary: 'tomato',
            secondary: 'khaki',
            gray: 'lightslategray'
        }
    },
    hashRouter: true,
    plugins: [reactApp()]
};
