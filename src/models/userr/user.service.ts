import { pool } from "../../db"
import type { userInterface } from "./user.interface";


const createUser = async( payload:userInterface) => {
    const { name, email } = payload
    const result = await pool.query(`
            INSERT INTO boni (name, email) VALUES ($1, $2) RETURNING *
        `, 
        [name, email]
    )
    return result;
}

export const userService = {
    createUser,
}