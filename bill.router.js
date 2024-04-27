import express from 'express';
import { createBill, deleteBill } from './bill.controller.js';

const router = express.Router();


router.post('/bills', createBill);


router.delete('/bills/:id', deleteBill);

export default router;
