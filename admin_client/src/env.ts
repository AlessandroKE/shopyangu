export default {
    NEXT_PUBLIC: {
        ENABLE_VERCEL_SPEED_INSIGHTS: process.env.NEXT_PUBLIC_ENABLE_VERCEL_SPEED_INSIGHTS && process.env.NEXT_PUBLIC_ENABLE_VERCEL_SPEED_INSIGHTS.toLowerCase() == 'true',
        ENABLE_VERCEL_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS && process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS.toLowerCase() == 'true'
    },
    API_URL: process.env.API_URL ?? "http://localhost:8000/"
}