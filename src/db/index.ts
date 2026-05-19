import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.db
})

export const DB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS boni (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `)
    } catch (error) {
        console.error('Error creating table:', error)
    }
}

