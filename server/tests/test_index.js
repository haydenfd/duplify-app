const request = require('supertest');
const assert = require('assert');
const app = require('../index');

let server;

before((done) => {
    require('dotenv').config();
    server = app.listen(process.env.PORT, done);
});

after((done) => {
    server.close(done);
});

describe('GET /', function () {
    it('should respond with status 200 and the correct port', function (done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                assert.strictEqual(res.body.Test, '8080');
                done();
            });
    });
});
