import { Router } from 'express';
import { createSale, getAllSales, getRecentSalesByUserId, getSalesByUserId } from '../controllers/sale.controllers';

const router = Router();

router.post('/', createSale)
router.get('/', getAllSales)
router.get('/:userId', getSalesByUserId)
router.get('/recent/:userId', getRecentSalesByUserId)

export default router