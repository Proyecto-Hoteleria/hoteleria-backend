import express from 'express'
import { createBill, deleteBill } from './bill.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/createBill/:id', [validateJwt], [isAdmin], createBill)
api.delete('/deleteBill/:id', [validateJwt], [isAdmin], deleteBill)

export default api