'use strict';

// set node_env as developmnet by default
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
console.log('environment: ', process.env.NODE_ENV);

const express = require('express');
const app = express();

const PORT = require('./config-api.json').api.port;  

app.get('/', (req, res) => { res.send('hello express'); });

app.listen(PORT, () => { console.log(`almundo API listening in port ${PORT}`); });