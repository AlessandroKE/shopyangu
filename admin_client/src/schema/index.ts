import { z } from "zod";


export const createShopSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, 'A shop should have at least 3 characters.'),
    description: z.string().min(30, "Provide a description that's at least 30 characters long"),
    logo: z.string().nullable().optional()
  });

export const createProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  price: z.coerce.number().min(1),
  description: z.string().min(30).max(2048),
  stock: z.coerce.number().min(0),
  shopId: z.string().nonempty(),
  image: z.string().nullable().optional()
});
