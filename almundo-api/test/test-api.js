'use strict';

console.log('current environment: ', process.env.NODE_ENV);

const expect = require('chai').expect;
const server = require(__dirname + '/../server.js');

describe('Testing Express server...', () => {
    let httpServer;
    before( async () => {
        await server.startServer().then( (server) => {
            httpServer = server;
        });
    });
    it('this is a test case and it should always pass', () => {
        expect(true).to.equal(true);
    });
    after(() => {
        httpServer.close( () => {
            console.log('http server closed.')
        });
    });
});
