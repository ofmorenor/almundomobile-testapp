'use strict';

// Asegurarse de que sólo corra en ambiente de pruebas.
if(process.env.NODE_ENV !== 'test') {
    console.log('This environment is not for testing: ', process.env.NODE_ENV);
    process.exit(-1);
}

const expect = require('chai').expect;
const server = require(__dirname + '/../server.js');
const http = require('../lib/http-client');
const PORT = require('../config-api.json').api.port;  
const apiUrl = `http://localhost:${PORT}/api`;

describe('Testing Express server...\n', () => {

    let httpServer;
    let testEndpointBody;
    let hotels;

    before( async () => {
        console.log('Preparing environment for tests...');

        await server.startServer().then( (server) => {
            httpServer = server;
            console.log('Test environment prepared successfully.\n');
        }).catch(err => { console.log('error: ', err) });

        await http.get(apiUrl + '/test').then( (body) => {
            testEndpointBody = body;
        }).catch(err => { console.log('error: ', err) });

        await http.get(apiUrl + '/hotels').then( body => {
            console.log('body of /hotels: ', body);
            hotels = JSON.parse(body).hotels;
        }).catch(err => { console.log('error: ', err) });
    });

    it('Get api/test returns "server running"', () => {
        expect(testEndpointBody).to.equal('server running');
    });

    describe('Testing api/hotels endpoint...', () => {
        it('hotels array has 5 elements', () => {
            expect(hotels.length).to.equal(5);
        });
    });

    after(() => {
        console.log('\nFinishing test environment...');
        httpServer.close( () => {
            console.log('http server closed.')
        });
    });
});
