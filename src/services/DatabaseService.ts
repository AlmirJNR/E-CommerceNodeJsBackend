import postgres from 'pg';

const { Client } = postgres;

/** Used to see if the client is connected to the database */
let isConnected = false;

/** This variable is the instance of the database */
export const client = new Client({
	user: process.env.HEROKU_USER,
	host: process.env.HEROKU_HOST,
	database: process.env.HEROKU_DATABASE,
	password: process.env.HEROKU_PASSWORD,
	port: Number(process.env.DATABASE_HEROKU_PORT)
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
