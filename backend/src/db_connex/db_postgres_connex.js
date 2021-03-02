import pg from 'pg';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const { Client } = pg;

const dbConfig = {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
}
const  dbClient = new Client(dbConfig);

await dbClient.connect(err => {
    if (err) {
        logger.error({
            message:  '[PostgresConnection] Error conectando a la base de datos'
        });
    } else {
        logger.info({
            message:  '[PostgresConnection] Conección a la base de datos exitosa'
        });
    }
});

export default dbClient;

