'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const routeController = require('./routes/upload_images');
// const Connection = require('./config/database');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: require('hapi-auto-route'),
        options: {
            routes_dir: Path.join(__dirname, 'routes')
        }
    });

    server.route(routeController);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();