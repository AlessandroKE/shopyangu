interface Entity {
    id?: string,
    createdAt: string,
    modifiedAt: string | null
}

export interface Shop extends Entity {
    name: string,
    description: string,
    logo: string | null,
}

export interface Product extends Entity {
    name: string,
    price: number,
    stock: number,
    description: string,
    image: string,
    shopId: string,
}
