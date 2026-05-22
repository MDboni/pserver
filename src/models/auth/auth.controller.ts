import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginUser = async (req:Request, res:Response) => {
       try {
           // Login logic here
        const result = await authService.loginIntoUserDb(req.body)
           
        res.status(200).json({
            success:true,
            message: "Login successful",
            data: result
           })
       } catch (error :any) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
    }
}

export const authController = {
    loginUser
}