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

// get all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProduct();

    //response send to client
    res.status(200).json({
      success: true,
      message: 'All product retrieve  successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong ',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something unknown error occurred',
        error: error,
      });
    }
  }
};

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductIntoDB(productId);

    //response send to client
    res.status(200).json({
      success: true,
      message: 'Specific product retrieve successfully!!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong ',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something unknown error occurred',
        error: error,
      });
    }
  }
};

// update single product
const specificProductUpdate = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedDataValidated = ProductSchema.parse(updateData);
    const product = await ProductService.specificProductUpdate(
      productId,
      updatedDataValidated,
    );

    if (!product) {
      return res.status(404).json({ message: 'Product Not Found!!' });
    }

    //response send to client
    res.status(200).json({
      success: true,
      message: 'Specific product Update successfully!!',
      data: product,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong ',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something unknown error occurred',
        error: error,
      });
    }
  }
};
export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  specificProductUpdate,
};
