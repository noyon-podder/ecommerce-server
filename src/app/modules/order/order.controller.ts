import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { Product } from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // find the product
    const { productId, quantity } = orderData;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found!',
        data: null,
      });
    }

    // check enough quantity stock
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient Stock!!',
      });
    }

    //reduce the product quantity
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    if (product.inventory.quantity <= 0) {
      product.inventory.inStock = false;
    } else {
      product.inventory.inStock = true;
    }

    // Save the updated product
    await product.save();

    // create new order
    const result = await OrderService.createOrderIntoDB(orderData);

    //response send to client
    res.status(200).json({
      success: true,
      message: 'Order Create Successfully!!!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!!',
      error,
    });
  }
};

// get all order
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const emailTerm = req.query.email;
    const result = await OrderService.getAllOrders(emailTerm as string);

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

export const OrderController = {
  createOrder,
  getAllOrders,
};
