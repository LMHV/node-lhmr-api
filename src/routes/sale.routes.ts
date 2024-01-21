import { Request, Response, NextFunction, Router } from 'express';
import { createSale, getAllSales, getRecentSalesByUserId, getSalesByUserId } from '../controllers/sale.controllers';

const router = Router();

router.get('/', getAllSales)
router.post('/', createSale)
router.get('/:userId', getSalesByUserId)
router.get('/recent/:userId', getRecentSalesByUserId)

export default router