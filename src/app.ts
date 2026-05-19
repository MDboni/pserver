
import express, { type Application, type Request, type Response } from 'express'
import { pool } from './db'
import { userRoute } from './models/userr/user.routes'

const app:Application = express()
app.use(express.json())





app.get('/api', async(req: Request, res:Response) => {
  try {
    const result= await pool.query(`
        SELECT * FROM boni 
        `)
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            boni: result.rows
        })
  } catch (error:any) {
    res.status(500).json({ 
        success: false,
        message: error.message,
        error
    })
  }
})



app.use("/api/post", userRoute)

app.get("/api/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await pool.query(`
            SELECT * FROM boni WHERE id = $1
        `, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            boni: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
})

app.put("/api/:id", async (req:Request, res: Response) => {
    const { id } = req.params ;
    const { name, email } = req.body
    try {
        const result = await pool.query(`
            UPDATE boni SET
            name = COALESCE($1, name),
            email = COALESCE($2, email)
            WHERE id = $3 RETURNING *
            `, [name, email, id])  

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            boni: result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
})

app.delete("/api/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await pool.query(`
            DELETE FROM boni WHERE id = $1 RETURNING *
        `, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            boni: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
})

export default app