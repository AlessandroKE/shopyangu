'use server'

import { HttpClient } from "@/services/http"
import { Product } from "@/types"


export async function getProducts(queries: Record<string, string | number> = {}) {
    const httpClient = new HttpClient()
    
    try {
        return await httpClient.get<Product[]>('products', {...queries, _sort:'createdAt', _order:'desc'})
    } catch (error) {
        return {error}
    }
}

export async function deleteProduct(productId: string){
    const httpClient = new HttpClient()
    try {
        await httpClient.delete(`products/${productId}`)
        return {
            success: true,
            message: "Product deleted successfully"
        }
    } catch {
        return {
            success: false,
            message: "An error occurred while deleting the product."
        }
    }
}

export async function deleteProducts(productIds: string[]){
    const httpClient = new HttpClient()
    try {
        const erroredIds = []
        for(const productId of productIds) {
            try {
                await httpClient.delete(`products/${productId}`)
            } catch {
                erroredIds.push(productId)
            }
        }
        if(erroredIds.length) {
            return {
                success: false,
                message: 'Some products were not deleted. IDs: ' + erroredIds.join(',')
            }
        }
        return {
            success: true,
            message: "Products deleted successfully"
        }
    } catch {
        return {
            success: false,
            message: "An error occurred while deleting the products."
        }
    }
}
