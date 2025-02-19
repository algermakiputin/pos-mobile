import { gql } from "@apollo/client";

export const STORE_SALES = gql`
    mutation StoreSales($sales: SalesInput) {
        storeSales(sales: $sales) {
            success
            message
        }
    }
`;

export const GET_SALES_ANALYTICS = gql`
    query GetSales($filter: getSalesInput) {
        getSales(filter: $filter) {
            totalEarnings
            itemSold
            netSales
            transactions {
                transaction_number
                total
                totalItems
                date_time
            }
        }
    }
`;

export const GET_SALES_OVERVIEW = gql`
    query GetSalesOverview {
        getSalesOverview {
            data
            keys
        }
    }
`;

export const GET_SALES_DETAILS = gql`
    query GetSalesDetails($transaction_number: String) {
        getSalesDetails(transaction_number: $transaction_number) {
            name
            price
            capital
            quantity
            created_at
        }
    }
`;