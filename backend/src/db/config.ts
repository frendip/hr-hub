import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

class PoolDb {
    private _pool: pg.Pool;

    constructor() {
        this._pool = new pg.Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: +process.env.DB_PORT
        });
    }

    async connect() {
        return this._pool.connect();
    }
}

export default new PoolDb();
