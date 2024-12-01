'use server'

import { HttpClient } from "@/services/http"
import { Product, Shop } from "@/types"

export async function getShops(queries: Record<string, string | number> = {}) {
    const httpClient = new HttpClient()
    
    try {
        return await httpClient.get<Shop[]>('shops', queries)
    } catch (error) {
        return {error}
    }
}

export async function deleteShop(shopId: string){
    const httpClient = new HttpClient()
    try {
        const shopProducts = await httpClient.get<Product[]>('products', {shopId})
        if(shopProducts.length) {
            return {
                success: false,
                message: 'Please delete or reassign shop products before deleting shop.'
            }
        }
        await httpClient.delete(`shops/${shopId}`)
        return {
            success: true,
            message: "Shop deleted successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "An error occurred while deleting the shop."
        }
    }
}

export async function deleteShops(shopIds: string[]){
    const httpClient = new HttpClient()
    try {
        const erroredIds = []
        for(const shopId of shopIds) {
            try {
                const shopProducts = await httpClient.get<Product[]>('products', {shopId})
                if(shopProducts.length) {
                    erroredIds.push(shopId)
                }
                await httpClient.delete(`shops/${shopId}`)
            } catch {
                erroredIds.push(shopId)
            }
        }
        if(erroredIds.length) {
            return {
                success: false,
                message: 'Some shops were not deleted due to having linked products. IDs: ' + erroredIds.join(',')
            }
        }
        return {
            success: true,
            message: "Shops deleted successfully"
        }
    } catch {
        return {
            success: false,
            message: "An error occurred while deleting the shops."
        }
    }
}
