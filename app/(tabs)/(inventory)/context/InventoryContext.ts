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
    setSelectedSupplier: () => null,
    removeFilter: () => null
}

type Context = {
    filters: Filter,
    setFilter: (filterName: string, value: string | string[]) => void
    selectedCategory: ObjectValue[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<ObjectValue[]>>
    selectedSupplier: ObjectValue[],
    setSelectedSupplier: React.Dispatch<React.SetStateAction<ObjectValue[]>>
    removeFilter: (filterName: ObjectFilterEnum, id: String) => void
}

export type ObjectValue = {
    id: String,
    name: String
}

export enum ObjectFilterEnum  {
    CATEGORIES = "categories",
    SUPPLIERS = "suppliers"
}
type Filter = { 
    query: String,
    categories: ObjectValue[],
    suppliers: ObjectValue[]
}
const InventoryContext = createContext<Context>(defaultValue);

export default InventoryContext;