import { z } from "zod";


export const createShopSchema = z.object({
    name: z.string().min(3, 'A shop should have at least 3 characters.'),
    description: z.string().min(30, "Provide a description that's at least 30 characters long"),
    logo: z.string().optional()
  });
