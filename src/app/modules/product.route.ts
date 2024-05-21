import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

//product create router
router.post('/', ProductController.createProduct);

export const productRoutes = router;
