import Router from 'express';
import { client } from '../services/DatabaseService.js';

/** Variable that stores a Express router */
const router = Router();

//	Returns specific digital product data in Json format
router.get('/byName/:productName', async (request, response) => {
	response.json((await client.query('SELECT nome, imagem FROM mercadorias_digitais WHERE nome = $1',
		[request.params.productName.replace(/_/g, " ")])).rows);
});

//	Returns All digital products data in Json format with pagination treatment
router.get('/allProducts', async (request, response) => {
	let itemsPerPage = request.query.itemsPerPage ? Number(request.query.itemsPerPage) : 5;
	let offset = request.query.page ? ((Number(request.query.page) - 1) * itemsPerPage) : 0;

	response.json((await client.query('SELECT * FROM mercadorias_digitais LIMIT $1 OFFSET $2',
		[itemsPerPage, offset])).rows);
});

export default router;
