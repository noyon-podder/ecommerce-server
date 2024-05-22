import { Product } from './product.model';
import { TProduct } from './product.type';

const productCreateIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};

// get all product into db
const getAllProduct = async () => {
  const result = await Product.find();

  return result;
};

// get specific product into db

const getSingleProductIntoDB = async (productId: string) => {
  const result = await Product.findById(productId);

  return result;
};

export const ProductService = {
  productCreateIntoDB,
  getAllProduct,
  getSingleProductIntoDB,
};
