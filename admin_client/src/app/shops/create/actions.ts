'use server'

import { createShopSchema } from "@/schema";
import { HttpClient } from "@/services/http";
import { ServerActionState, Shop } from "@/types";
import { z } from "zod";


export async function createShop (previousState: ServerActionState | null, data: z.infer < typeof createShopSchema >){
    const httpClient = new HttpClient<Shop>()

    const shop = {
        name: data.name,
        description: data.description,
        createdAt: new Date().toISOString(),
        modifiedAt: null,
        logo: data.logo ?? null
    }

    try {
        await httpClient.post('shops',shop)
        return {
            success: true,
            message: "Shop created successfully"
        }
    }
    catch {
        return {
            success: false,
            message: "An error occured while creating a shop. "
        }
    }
}