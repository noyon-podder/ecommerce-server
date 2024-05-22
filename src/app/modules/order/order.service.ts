import { Order } from './order.model';
import { TOrder } from './order.type';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};

// get all orders into db
const getAllOrders = async (emailSearch: string | undefined) => {
  let orderResult;
  if (emailSearch) {
    orderResult = await Order.find({
      email: emailSearch,
    });
  } else {
    orderResult = await Order.find();
  }
  return orderResult;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrders,
};
