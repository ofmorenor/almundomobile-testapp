'use strict';

// set node_env as developmnet by default
const env = process.env.NODE_ENV;
if(env !== 'production' && env !== 'test') {
    process.env.NODE_ENV = 'development';
}

console.log('current environment: ', process.env.NODE_ENV);

const express = require('express');
const app = express();

const PORT = require('./config-api.json').api.port;  

app.get('/', (req, res) => { res.send('hello express'); });

exports.startServer = function() {
    return new Promise((resolve) => {
        const serverInstance = app.listen(PORT, () => { 
            console.log(`almundo API listening in port ${PORT}`); 
        });
        resolve(serverInstance);
    });
}
