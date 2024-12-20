import { createContext } from "react";
export const defaultValue = {
    filters: {
        query: '',
        categories: [],
        suppliers: []
    },
    setFilter: () => null,
    selectedCategory: [],
    selectedSupplier: [],
    setSelectedCategory: () => null,
    setSelectedSupplier: () => null
}

type Context = {
    filters: Filter,
    setFilter: (filterName: string, value: string | string[]) => void
    selectedCategory: String[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<String[]>>
    selectedSupplier: String[],
    setSelectedSupplier: React.Dispatch<React.SetStateAction<String[]>>
}

type Filter = { 
    query: String,
    categories: String[],
    suppliers: String[]
}
const InventoryContext = createContext<Context>(defaultValue);

export default InventoryContext;