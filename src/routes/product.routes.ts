import { Router } from 'express';
import { createProduct, getProductsByUserId, updateProductPrice } from '../controllers/product.controllers';

const router = Router();

router.post('/', createProduct)
router.get('/:userId', getProductsByUserId)
router.post('/update/productPrice', updateProductPrice)

export default router