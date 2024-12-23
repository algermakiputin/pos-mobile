import { gql } from "@apollo/client";

export const STORE_SALES = gql`
    mutation StoreItem($sales: SalesInput) {
        storeSales(sales: $sales) {
            success
            message
        }
    }
`;

export const GET_SALES_ANALYTICS = gql`
    query GetSales {
        getSales {
            totalEarnings
            itemSold
            netSales
            transactions {
            transaction_number
            total
            totalItems
            }
        }
    }
`;