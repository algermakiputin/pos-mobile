import { gql } from "@apollo/client";

export const GET_SUPPLIER = gql`
    query Suppliers($storeId: ID) {
        suppliers(storeId: $storeId) {
            id
            name
            address
            contact
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

export const FIND_SUPPLIER = gql`
    query Suppliers($id: ID) {
        supplier(id: $id) {
            id
            name
            address
            contact
            email
        }
    }
`;  

export const UPDATE_SUPPLIER = gql`
    mutation UpdateSupplier($supplier: SupplierUpdateInput) {
        updateSupplier(supplier: $supplier) {
            success
            message
        }
    }
`;