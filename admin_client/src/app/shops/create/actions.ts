'use server'

import { HttpClient } from "@/services/http";
import { ServerActionState, Shop } from "@/types";


export async function createShop (previousState: ServerActionState | null, formData: FormData){
    const httpClient = new HttpClient<Shop>()

    const shop = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        //logo: formData.get('logo') as string,
        createdAt: new Date().toISOString(),
        modifiedAt: null,
        logo: null
    }

    try {
        await httpClient.post('shops',shop)
        return {
            success: true,
            message: "Shop created successfully"
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (_) {
        return {
            success: false,
            message: "An error occured while creating a shop. "
        }
    }
}