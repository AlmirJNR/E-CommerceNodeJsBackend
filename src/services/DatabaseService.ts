import postgres from 'pg';

const { Client } = postgres;

/** Used to see if the client is connected to the database */
let isConnected = false;

/** This variable is the instance of the database */
export const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'password',
	port: 5432,
});

/** This function connects to the database only once */
export async function connectToDatabase() {
	if (!isConnected) {
		try {
			await client.connect();
			console.info('Connect to database');
			isConnected = true;
		} catch (error) {
			console.error('Failed to connect\n', error);
			process.exit(1);
		}
	}
}
