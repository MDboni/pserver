import { pool } from "../../db";
import type { IProfile } from "./profile.interface"


const createProfile = async (payload: IProfile) => {
 const { user_id, bio } = payload
  
 const user = await pool.query(`
    SELECT * FROM users WHERE id = $1
 `, [user_id])
  if (user.rowCount === 0) {
    throw new Error("User not found")
 }    
   
 const result = await pool.query(`
        INSERT INTO profile (user_id, bio) VALUES ($1, $2) RETURNING *
    `, 
    [ user_id, bio ]
)
   return result;
}

export const profileService = {
    createProfile
}