interface Entity {
    id?: string,
    createdAt: string,
    modifiedAt: string | null
}

export interface Shop extends Entity {
    name: string,
    description: string,
    logo: string | null,
    products?: Product[]
}

export interface Product extends Entity {
    name: string,
    price: number,
    stock: number,
    description: string,
    image: string,
    shopId: string,
    shopName?: string,
}

export interface ServerActionState {
    success: boolean
    message: string
}


export interface OverviewMetrics {
    totalShops: number;
    totalProducts: number;
    totalValue: number;
    totalStock: number;
};
export interface StockStatus {
    inStock: number;
    outOfStock: number;
    lowStock: number;
};
export interface TopShopsByStock {
    id?: string
    name: string
    stockLevel: number
}

export interface Metrics {
    overviewMetrics: OverviewMetrics,
    stockStatus: StockStatus,
    topShopsByStock: TopShopsByStock[]
};

