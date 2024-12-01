import env from "@/env"

export class HttpClient<T> {
    private baseUrl: string = env.API_URL

    constructor(baseUrl: string | null = null) {
       if (baseUrl) this.baseUrl = baseUrl
    }

    async get<T>(path: string, queries: Record<string, string | number> | null = null) {
        const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json() as T
    }
    
    async post(path: string, data: T, queries: Record<string, string | number> | null = null) {
        const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json() as T
    }
    
    async put(path: string, data: T, queries: Record<string, string | number> | null = null) {
        const response = await fetch(`${this.baseUrl}${path}${queries? this.toQueryString(queries) : ''}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json() as T
    }
    async patch<T>(path: string, data: Partial<T>, queries: Record<string, string | number> | null = null) {
        const response = await fetch(`${this.baseUrl}${path}${queries? this.toQueryString(queries) : ''}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json() as T
    }
    async delete(path: string, queries: Record<string, string | number> | null = null) {
        const response = await fetch(`${this.baseUrl}${path}${queries? this.toQueryString(queries) : ''}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    }


    private toQueryString(params: Record<string, string | number>): string {
        return (
            "?" +
            Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&")
        );
    }

}
