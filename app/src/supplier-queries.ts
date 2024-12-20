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