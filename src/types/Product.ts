export type Products_type = {
    id: string
    img: string | string[]
    product_name: string
    price: number
    currency: string
    category: string
    stock: number
    condition: string
    rating: number
    shipping: Array<String>
    description: string
    status: string
    delivery_status: string
    specs: Record<string, string>
    active: boolean
}
