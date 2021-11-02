import Router from 'express';
import { client } from '../services/DatabaseService.js';

/** Variable that stores a Express router */
const router = Router();

//	Registers a new login with password in database
router.post('/register', async (request, response) => {
	if (!request.body.name || !request.body.email || !request.body.password) {
		response.sendStatus(400);
		return;
	}

	const databaseResult = (await client.query('SELECT email FROM usuarios WHERE email = $1;',
	[request.body.email]));

	if (databaseResult.rowCount !== 0) {
		response.sendStatus(400);
	}
	else {
		response.json((await client.query('INSERT INTO usuarios(nome, email, senha) VALUES ($1, $2, $3);',
		[request.body.name, request.body.email, request.body.password])).rowCount);
	}
});

//	Login a new user login with password in database
router.post('/login', async (request, response) => {
	if (!request.body.email || !request.body.password) {
		response.sendStatus(400);
		return;
	}

	const databaseResult = (await client.query('SELECT senha, nome FROM usuarios WHERE email = $1;',
	[request.body.email]));

	if (databaseResult.rowCount === 0) {
		response.sendStatus(404);
		return;
	}

	const loginResult = databaseResult.rows[0].senha === request.body.password;

	if (loginResult) {
		response.json(databaseResult.rows[0].nome);
	}
	else {
		response.sendStatus(401);
	}
});

export default router;
