const request = require('supertest');
const expect = require('chai').expect;
const config = require('./config');
const { Server } = require('./../../server');



describe('-- Admin tests --', () => {

    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
            .then((obj) => {
                app = obj.app;
            });
    });

    describe('GET /auth/viewbookings', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewbookings')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewcars', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewcars')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewusers', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewusers')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewdeals', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewdeals')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/edituser/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/edituser/424242424242')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /auth/edituser/:id', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/edituser/424242424242')
                .expect('Content-type', /html/)
                .expect(403)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
