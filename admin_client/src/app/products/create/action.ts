'use server'

import { createProductSchema } from "@/schema";
import { HttpClient } from "@/services/http";
import { ServerActionState, Product } from "@/types";
import { z } from "zod";


export async function createProduct (previousState: ServerActionState | null, data: z.infer < typeof createProductSchema >){
    const httpClient = new HttpClient<Product>()

    const product = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        shopId: data.shopId,
        image: '',
        createdAt: new Date().toISOString(),
        modifiedAt: null,
    }

    try {
        await httpClient.post('products', product)
        return {
            success: true,
            message: "Product created successfully"
        }
    }
    catch {
        return {
            success: false,
            message: "An error occured while creating a shop. "
        }
    }
}
