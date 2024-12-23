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
    mutation StoreItem($item: ItemInput!) {
        storeItem(item: $item)
    }
`;