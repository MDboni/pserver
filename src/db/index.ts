import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.db
})

export const DB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `) ;

        await pool.query(`
            CREATE TABLE IF NOT EXISTS profile (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
                bio TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
            `)
            console .log('Tables created successfully')
    } catch (error) {
        console.error('Error creating table:', error)
    }
}

