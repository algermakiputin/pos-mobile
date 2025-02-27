import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
    query Items($filter: ItemFilter) {
        items(filter: $filter) {
            data {
                id
                name
                description
                price
                stocks
                categoryName
                supplierName
                barcode
                capital
                image
            }
            count
        }
    }
`;

export const STORE_ITEM = gql`
    mutation Mutation($item: ItemInput!) {
        storeItem(item: $item) {
            success
            message
            data
        }
    }
`;

export const GET_ITEM = gql`
    query Item($id: ID) {
        item(id: $id) {
            id
            name
            description
            price
            stocks
            categoryName
            supplierName
            barcode
            capital
            supplier_id
            category_id
            image
        }
    }
`;

export const UPDATE_ITEM = gql`
    mutation UpdateItem($editItemInput: EditItemInput) {
        updateItem(editItemInput: $editItemInput) {
            success
            message
            data
        }
    }
`;

export const DESTROY_ITEM = gql`
    mutation DestroyItem($id: ID!) {
        destroyItem(id: $id) {
            success
            message
            data
        }
    }
`;

export const GET_SUMMARY = gql`
    query InventorySummary($storeId: ID!) {
        inventorySummary(storeId: $storeId) {
            totalItems
            capital
            categories
            value
        }
    }
`;