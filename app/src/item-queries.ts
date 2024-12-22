import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
    query Items($filter: ItemFilter) {
        items(filter: $filter) {
            id
            name
            description
            price
            stocks
            categoryName
            supplierName
            barcode,
            capital
        }
    }
`;

export const STORE_ITEM = gql`
    mutation StoreItem($item: ItemInput!) {
        storeItem(item: $item)
    }
`;