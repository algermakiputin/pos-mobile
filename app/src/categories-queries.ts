import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query Categories {
        categories {
            id
            name
            description
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