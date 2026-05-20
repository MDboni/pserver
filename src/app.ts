
import express, { type Application, type Request, type Response } from 'express'
import { pool } from './db'
import { userRoute } from './models/userr/user.routes'
import { profileRoute } from './models/profile/profile.route'

const app:Application = express()
app.use(express.json())


app.use("/api", userRoute)
app.use("/api/profile", profileRoute)



export default app