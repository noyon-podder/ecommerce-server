import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

//product create router
router.post('/', ProductController.createProduct);

router.get('/', ProductController.getAllProduct);

router.get('/:productId', ProductController.getSingleProduct);

router.put('/:productId', ProductController.specificProductUpdate);

export const productRoutes = router;
