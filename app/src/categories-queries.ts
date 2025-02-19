import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query Categories($storeId: ID) {
        categories(storeId: $storeId) {
            id
            name
            itemCount
        }
    }
`;

export const FIND_CATEGORY = gql`
    query Category($id: ID) {
        category(id: $id) {
            name
            id
        }
    }
`;

export const STORE_CATEGORY = gql`
    mutation StoreCategory($category: CategoryInput) {
        storeCategory(category: $category) {
            success
            message
            data
        }
    }
`;

export const DESTROY_CATEGORY = gql`
    mutation StoreCategory($id: ID!) {
        destroyCategory(id: $id) {
            success
            message
            data
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($category: CategoryInput) {
        updateCategory(category: $category) {
            success
            message
        }
    }
`;