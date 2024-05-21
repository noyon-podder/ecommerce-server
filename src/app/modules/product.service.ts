import { Product } from './product.model';
import { TProduct } from './product.type';

const productCreateIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};

export const ProductService = {
  productCreateIntoDB,
};
