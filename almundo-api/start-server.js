'use strict';

const server = require('./server.js');

server.startServer()
.then( () => {
    console.log('web server started successfully.');
})
.catch( (err) => {
    console.log('Error starting web server: ', err);
 });