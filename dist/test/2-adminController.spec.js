import app from '../src/index.js';
import requestFrom from 'supertest';
describe('Test admin controller routes', () => {
    describe('/admin/totalUsers', () => {
        it('should return a value greater than 0 when database has any data', (done) => {
            requestFrom(app).get('/admin/totalUsers').expect('1', done);
        });
    });
    describe('/admin/test@email.com', () => {
        it('should return a specific email when database has that email', (done) => {
            requestFrom(app).get('/admin/test@email.com')
                .expect('Content-Type', /json/)
                .expect(200, [{
                    nome: 'test',
                    email: 'test@email.com',
                    senha: 'test123'
                }], done);
        });
    });
});
//# sourceMappingURL=2-adminController.spec.js.map