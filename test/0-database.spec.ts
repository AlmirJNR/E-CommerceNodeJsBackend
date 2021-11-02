import mocha from 'mocha';
import assert from 'node:assert';
import { client, connectToDatabase } from '../src/services/DatabaseService.js';

connectToDatabase();
describe('Test connection to database', () => {
	it('should return row count > 0', async () => {
		const databaseResult = (await client.query('SELECT COUNT(*) FROM usuarios')).rowCount;
		assert.equal(databaseResult, 1);
	});
});
