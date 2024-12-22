import { gql } from "@apollo/client";

export const STORE_SALES = gql`
    mutation StoreItem($sales: SalesInput) {
        storeSales(sales: $sales) {
            success
            message
        }
    }
`;