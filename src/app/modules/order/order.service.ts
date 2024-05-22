import { Order } from './order.model';
import { TOrder } from './order.type';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
