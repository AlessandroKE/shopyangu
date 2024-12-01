'use server'

import { createShopSchema } from "@/schema";
import { HttpClient } from "@/services/http";
import { ServerActionState, Shop } from "@/types";
import { z } from "zod";


export async function editShop (previousState: ServerActionState | null, data: z.infer < typeof createShopSchema >){
    const httpClient = new HttpClient<Shop>()

    const shop = {
        name: data.name,
        description: data.description,
        modifiedAt: new Date().toISOString(),
        logo: null
    }

    try {
        await httpClient.patch('shops/' + data.id, shop)
        return {
            success: true,
            message: "Shop editted successfully"
        }
    }
    catch {
        return {
            success: false,
            message: "An error occured while editting a shop. "
        }
    }
}

export async function getShop (shopId: string){
    const httpClient = new HttpClient<Shop>()
    try {
        return await httpClient.get('shops/'+ shopId)
    }
    catch {
        return null
    }
}
