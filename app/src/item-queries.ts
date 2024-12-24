import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
    query Items {
        items {
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
        }
    }
`;

export const UPDATE_ITEM = gql`
    
`;