import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation Register($user: UserInput) {
        register(user: $user) {
            id
            email
            token
            firstName
            lastName
        }
    }
`;

export const LOGIN = gql`
    mutation Register($user: LoginInput) {
        login(user: $user) {
            id
            email
            token
            firstName
            lastName
        }
    }
`;