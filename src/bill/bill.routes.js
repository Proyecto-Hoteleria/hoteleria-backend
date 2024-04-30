import express from 'express'
import { createBill, deleteBill } from './bill.controller.js'

const router = express.Router()

router.post('/createBill', createBill)

router.delete('/deleteBill/:id', deleteBill)

export default router