import { createContext } from "react";
import { Order } from "@/app/types/order";

export const defaultValue = {
    order: {
        cart: {
            lineItems: [{
                itemId: '',
                name: '',
                price: '',
                quantity: 0,
                capital: 0,
                barcode: ''
            }],
            total: ''
        },
        customerName: '',
        customerId: ''
    },
    quantityHandler: (action: string, item: any) => 0,
    setCustomer: (data: any) => null,
    orderTotal: 0,
}

type Context = {
    order: Order,
    quantityHandler: (action: string, item: any) => void,
    orderTotal: number,
    setCustomer: (data: any) => void,
    resetState?: () => void
}

const OrderContext = createContext<Context>(defaultValue);

export default OrderContext;
