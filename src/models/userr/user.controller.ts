import type { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async(req:Request, res:Response) => {
  
    try {
        const result = await userService.createUser(req.body)

        res.status(201).json(
            {  
                success: true,
                message: "Data inserted successfully" ,
                user: result.rows[0]
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

const getAllUsers = async(req:Request, res:Response) => {
      try {
        const result = await userService.getUser()
            res.status(200).json({
                success: true,
                message: "Data retrieved successfully",
                user: result.rows
            })
      } catch (error:any) {
        res.status(500).json({ 
            success: false,
            message: error.message,
            error
        })
      }
}

const getSingaleUser = async(req:Request, res:Response) => {
    const { id } = req.params
    try {
       
        const result = await userService.getSingaleUser(id as string)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            user: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }

}

const updateUser = async(req:Request, res:Response) => {

    const { id } = req.params ;
    const { name, email } = req.body
    try {
        
        const result = await userService.updateUser(id as string, { name, email })
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            user: result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const deleteUser = async(req:Request, res:Response) => {
    const { id } = req.params

    try {
        const result = await userService.deleteUser(id as string)
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            user: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingaleUser,
    updateUser,
    deleteUser
}
