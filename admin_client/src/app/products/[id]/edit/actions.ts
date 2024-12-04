'use server'

import { createProductSchema } from "@/schema";
import { HttpClient } from "@/services/http";
import { ServerActionState, Product, Shop } from "@/types";
import { z } from "zod";


export async function updateProduct (previousState: ServerActionState | null, data: z.infer < typeof createProductSchema >){
    const httpClient = new HttpClient<Product>()

    const product = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        shopId: data.shopId,
        image: data.image ?? '',
        modifiedAt: new Date().toISOString(),
    }

    try {
        await httpClient.get<Shop>('shops/' + data.shopId)
        await httpClient.patch('products/' + data.id, product)
        return {
            success: true,
            message: "Product updated successfully"
        }
    }
    catch {
        return {
            success: false,
            message: "An error occured while editting a product. "
        }
    }
}

export async function getProduct (productId: string){
    const httpClient = new HttpClient<Product>()
    try {
        return await httpClient.get('products/'+ productId)
    }
    catch {
        return null
    }
}
