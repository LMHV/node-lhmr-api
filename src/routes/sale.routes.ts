import { Router } from 'express';
import { createSale, deleteSale, getAllSales, getRecentSalesByUserId, getSalesByUserId } from '../controllers/sale.controllers';

const router = Router();

router.post('/', createSale)
router.get('/', getAllSales)
router.get('/:userId', getSalesByUserId)
router.get('/recent/:userId', getRecentSalesByUserId)
router.delete('/:userId/:saleId', deleteSale)

export default router