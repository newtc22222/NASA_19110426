const request = require('supertest');

const app = require('./app');

describe("GET /planets", function () {
    it("responds with json", function (done) {
        request(app)
            .get('/v1/planets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});

describe("GET /launches", function () {
    it("responds with json", function (done) {
        request(app)
            .get('/v1/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});
describe("POST /launches", function () {
    it("responds with json", function (done) {
        request(app)
            .post('/v1/launches')
            .send({
                "mission": "ZTM155",
                "rocket": "ZTM Experimental IS1",
                "target": "Kepler-186 f",
                "launchDate": "December, 31, 2029"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
    it("responds error - invalid date", function (done) {
        request(app)
            .post('/v1/launches')
            .send({
                "mission": "ZTM155",
                "rocket": "ZTM Experimental IS1",
                "target": "Kepler-186 f",
                "launchDate": "Hello"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
    it("responds error - missing data", function (done) {
        request(app)
            .post('/v1/launches')
            .send({
                "mission": "",
                "rocket": "ZTM Experimental IS1",
                "target": "Kepler-186 f",
                "launchDate": "Hello"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});
describe("DELETE /launches/:id", function () {
    it("delete lauches 100 - responds with json", function (done) {
        request(app)
            .delete('/v1/launches/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    });
    it("delete lauches 100 again- responds with json", function (done) {
        request(app)
            .delete('/v1/launches/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    });
    it("delete lauches with id not exists", function (done) {
        request(app)
            .delete('/v1/launches/101')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});

describe("GET /*", function () {
    it("return html page", function (done) {
        request(app)
            .get('/v1/abc')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});