import { pool } from "../../db";
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken";
import config from "../../config";

const loginIntoUserDb = async (payload: { email: string; password: string }) => {

    const { email, password } = payload ;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `, [email])

    if (userData.rowCount === 0) {
        throw new Error("User not found")
    }

    const user = userData.rows[0]
    console.log(user)

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw new Error("Invalid password")
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name
    }

    const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET_KEY, { expiresIn: "1h" })
    // Authentication logic here

    console.log(accessToken)
  
    return {accessToken}

}

export const authService = {
     loginIntoUserDb ,
}