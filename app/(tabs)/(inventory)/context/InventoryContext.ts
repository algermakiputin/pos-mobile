import { createContext } from "react";
export const defaultValue = {
    filters: {
        query: '',
        categories: [],
        suppliers: []
    },
    setFilter: () => null
}

type Context = {
    filters: Filter,
    setFilter: (filterName: string, value: string) => void
}

type Filter = { 
    query: String,
    categories: String[],
    suppliers: String[]
}
const InventoryContext = createContext<Context>(defaultValue);

export default InventoryContext;