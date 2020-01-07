'use strict';

// set node_env as developmnet by default
const env = process.env.NODE_ENV;
if(env !== 'production' && env !== 'test') {
    process.env.NODE_ENV = 'development';
}

console.log('current environment: ', process.env.NODE_ENV);

const express = require('express');
const app = express();
const data = require('./data.json');

const PORT = require('./config-api.json').api.port;  


// Contenido estático en la carpeta public
app.use('/static', express.static('./public'));

// pequeña pagina de bienvenida
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
});

// esta ruta existe solamente para los tests automáticos
app.get('/api/test', (req, res) => { res.send('server running'); });

// por ahora los datos son traidos de un archivo json en el servidor 
app.get('/api/hotels', (req, res) => { 
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ hotels: data.hotels })); 
});

exports.startServer = function() {
    return new Promise((resolve) => {
        const serverInstance = app.listen(PORT, () => { 
            console.log(`almundo API listening in port ${PORT}`); 
        });
        resolve(serverInstance);
    });
}
