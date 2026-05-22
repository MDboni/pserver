import { pool } from "../../db"
import bcrypt from "bcrypt";
import type { userInterface, userUpdateInterface } from "./user.interface";


const createUser = async( payload:userInterface) => {
    const { name, email, password } = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
        `, 
        [name, email, hashedPassword]
    )
    return result;
}

const getUser = async() => {
    const result= await pool.query(`
            SELECT * FROM users 
            `)
    return result;
}

const getSingaleUser = async(id:string) => {
     const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
        `, [id])
    return result;
}


const updateUser = async(id:string, payload:userUpdateInterface) => {
    const { name, email } = payload
    const result = await pool.query(`
            UPDATE users SET
            name = COALESCE($1, name),
            email = COALESCE($2, email)
            WHERE id = $3 RETURNING *
            `, [name, email, id])  
    return result;
}

const deleteUser = async(id:string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *
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
