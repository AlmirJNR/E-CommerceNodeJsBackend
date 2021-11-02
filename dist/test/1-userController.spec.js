import app from '../src/index.js';
import requestFrom from 'supertest';
describe('Test user controller routes', () => {
    describe('/user/register', () => {
        it('should return status 400 when body is missing an paramter', (done) => {
            requestFrom(app).post('/user/register').send({
                name: 'test',
                email: 'test@email.com',
                //password: 'test123'
            }).expect(400, done);
        });
        it('should return status 200 when user is successfully registered', (done) => {
            requestFrom(app).post('/user/register').send({
                name: 'test',
                email: 'test@email.com',
                password: 'test123'
            })
                .expect('Content-Type', /json/)
                .expect(200, '1', done);
        });
        it('should return status 400 when user already exists', (done) => {
            requestFrom(app).post('/user/register').send({
                name: 'test',
                email: 'test@email.com',
                password: 'test123'
            }).expect(400, done);
        });
    });
    describe('/user/login', () => {
        it('should return status 400 when body is missing an paramter', (done) => {
            requestFrom(app).post('/user/login').send({
                email: 'test@email.com',
                //password: 'test123'
            }).expect(400, done);
        });
        it('should return status 404 when user does not exists', (done) => {
            requestFrom(app).post('/user/login').send({
                email: 'test@email.email.com',
                password: 'test123'
            }).expect(404, done);
        });
        it('should return user name when login is successfull', (done) => {
            requestFrom(app).post('/user/login').send({
                email: 'test@email.com',
                password: 'test123'
            }).expect(200, '"test"', done);
        });
        it('should return status 401 when user passsword is incorrect', (done) => {
            requestFrom(app).post('/user/login').send({
                email: 'test@email.com',
                password: 'testWrongPassword'
            }).expect(401, done);
        });
    });
});
//# sourceMappingURL=1-userController.spec.js.map