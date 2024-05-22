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

export const OrderController = {
  createOrder,
};
