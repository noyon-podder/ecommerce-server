import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // verify data from zod
    const validateData = ProductSchema.parse(productData);

    const result = await ProductService.productCreateIntoDB(validateData);

    //response send to client
    res.status(200).json({
      success: true,
      message: 'Product Create Successfully!!!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Product create something wrong',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Product Create unknown error occurred',
        error: error,
      });
    }
  }
};

export const ProductController = {
  createProduct,
};
