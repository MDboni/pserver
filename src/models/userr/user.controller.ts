import type { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async(req:Request, res:Response) => {
  
    try {
        const result = await userService.createUser(req.body)

        res.status(201).json(
            {  
                success: true,
                message: "Data inserted successfully" ,
                boni: result.rows[0]
            }
            
        )
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }

}

export const userController = {
    createUser
}
