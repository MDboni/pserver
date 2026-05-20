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

const getUser = async() => {
    const result= await pool.query(`
            SELECT * FROM boni 
            `)
    return result;
}

const getSingaleUser = async(id:string) => {
     const result = await pool.query(`
            SELECT * FROM boni WHERE id = $1
        `, [id])
    return result;
}


const updateUser = async(id:string, payload:userInterface) => {
    const { name, email } = payload
    const result = await pool.query(`
            UPDATE boni SET
            name = COALESCE($1, name),
            email = COALESCE($2, email)
            WHERE id = $3 RETURNING *
            `, [name, email, id])  
    return result;
}

const deleteUser = async(id:string) => {
    const result = await pool.query(`
            DELETE FROM boni WHERE id = $1 RETURNING *
        `, [id])
    return result;
}

export const userService = {
    createUser,
    getUser,
    getSingaleUser,
    updateUser,
    deleteUser
}
