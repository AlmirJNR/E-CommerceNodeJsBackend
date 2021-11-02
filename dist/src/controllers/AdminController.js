import Router from 'express';
import { client } from '../services/DatabaseService.js';
/** Variable that stores a Express router */
const router = Router();
//	Returns the total amount of registered logins and passwords
router.get('/totalUsers', async (request, response) => {
    response.json((await client.query('SELECT COUNT(*) FROM usuarios')).rowCount);
});
//	Returns all logins and passwords
router.get('/allUsersInfos', async (request, response) => {
    response.json((await client.query('SELECT nome, email, senha FROM usuarios')).rows);
});
//	Returns specific login and password
router.get('/:email', async (request, response) => {
    response.json((await client.query('SELECT nome, email, senha FROM usuarios WHERE email = $1', [request.params.email])).rows);
});
export default router;
//# sourceMappingURL=AdminController.js.map