'use strict'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import roomRoutes from '../src/room/room.routes.js'
import eventRoutes from '../src/event/event.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
import billRoutes from '../src/bill/bill.routes.js'

const app = express()
config()
const port = process.env.PORT || 3056

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/room', roomRoutes)
app.use('/event', eventRoutes)
app.use('/comment', commentRoutes)
app.use('/bill', billRoutes)

export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}