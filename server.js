/* eslint no-console: 0 */
const express = require('express');
const path = require('path');
const app = express();
const serialize = require('serialize-javascript');

const { PORT = 3000, REACT_APP_BASE_URL } = process.env;
const env = {
    REACT_APP_BASE_URL
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/env.js', function(req, res) {
    res.set('Content-Type', 'application/javascript');
    res.send('window.env = ' + serialize(env));
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.info(`Server listen on port: ${PORT}`);
});
