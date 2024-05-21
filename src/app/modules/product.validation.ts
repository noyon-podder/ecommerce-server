import { z } from 'zod';

// Define the Variant schema
const VariantSchema = z.object({
  type: z.string().min(0),
  value: z.string().min(0),
});

// Define the Inventory schema
const InventorySchema = z.object({
  quantity: z.number().int().min(0),
  inStock: z.boolean(),
});

// Define the Product schema
export const ProductSchema = z
  .object({
    name: z.string().min(0),
    description: z.string().min(0),
    price: z.number().default(0),
    category: z.string().min(0),
    tags: z.array(z.string()),
    variants: z.array(VariantSchema),
    inventory: InventorySchema,
  })
  .nonstrict();
