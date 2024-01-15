import { Request, Response, NextFunction, Router } from 'express';
import { createVenta } from '../controllers/venta.controller';

const router = Router();

//router.get('/', getVentas)

router.post('/', createVenta)

export default router