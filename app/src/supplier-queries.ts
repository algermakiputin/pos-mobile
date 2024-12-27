import { gql } from "@apollo/client";

export const GET_SUPPLIER = gql`
    query Suppliers {
        suppliers {
            id
            name
            address
            phone
            email
        }
    }
`;

export const DESTROY_SUPPLIER = gql`
    mutation DestroySupplier($id: ID!) {
        destroySupplier(id: $id) {
            success
            message
            data
        }
    }
`;

export const STORE_SUPPLIER = gql`
    mutation StoreSupplier($supplier: SupplierInput) {
        storeSupplier(supplier: $supplier) {
            success
            message
            data
        }
    }
`;