import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
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
