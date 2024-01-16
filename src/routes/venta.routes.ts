import { Request, Response, NextFunction, Router } from 'express';
import { createVenta, getAllVentas } from '../controllers/venta.controller';

const router = Router();

router.get('/', getAllVentas)
router.post('/', createVenta)

export default router