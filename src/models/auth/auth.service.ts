import { pool } from "../../db";
import bcrypt from "bcrypt" 

const loginIntoUserDb = async (payload: { email: string; password: string }) => {

    const { email, password } = payload ;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `, [email])

    if (userData.rowCount === 0) {
        throw new Error("User not found")
    }

    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw new Error("Invalid password")
    }
    // Authentication logic here
    return userData.rows[0];

}

export const authService = {
    login: loginIntoUserDb
}