export type Order = {
    cart: Cart,
    customerName: string,
    customerId: Number
}

export type Cart = {
    lineItems: CartLineItem[]
    total: string,
}

export type CartLineItem = {
    itemId: string,
    name: string,
    price: string,
    quantity: number,
    capital: number,
    barcode: string,
}