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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// get all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductService.getAllProduct(searchTerm as string);

    //response send to client
    res.status(200).json({
      success: true,
      message: 'All product retrieve  successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// delete a user
const specificProductDelete = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct =
      await ProductService.specificProductDelete(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found!' });
    }

    //response send to client
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  specificProductUpdate,
  specificProductDelete,
};
