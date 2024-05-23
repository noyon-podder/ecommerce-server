import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.type';

// variant mongoose schema
const VariantSchema: Schema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

//  Inventory mongoose schema
const InventorySchema: Schema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// product mongoose schema
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [VariantSchema],
      required: true,
    },
    inventory: {
      type: InventorySchema,
      required: true,
    }
  },
  { timestamps: true },
);

// mongoose pre middleware
productSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const Product = mongoose.model<TProduct>('Product', productSchema);
