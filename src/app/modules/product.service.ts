import { Product } from './product.model';
import { TProduct } from './product.type';

const productCreateIntoDB = async (payload: TProduct) => {
  const result = await Product.create({ ...payload, isDeleted: false });

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

// specific product update successfully
const specificProductUpdate = async (
  productId: string,
  updatedData: TProduct,
) => {
  const result = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// specific product delete
const specificProductDelete = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);

  return result;
};

export const ProductService = {
  productCreateIntoDB,
  getAllProduct,
  getSingleProductIntoDB,
  specificProductUpdate,
  specificProductDelete,
};
