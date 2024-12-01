'use server'

import { HttpClient } from "@/services/http"
import { Shop } from "@/types"

export async function getShops(queries: Record<string, string | number> = {}) {
    const httpClient = new HttpClient()
    
    try {
        return await httpClient.get<Shop[]>('shops', queries)
    } catch (error) {
        return {error}
    }
}
