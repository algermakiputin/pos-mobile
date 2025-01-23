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
    mutation Login($user: LoginInput) {
        login(user: $user) {
            id
            email
            token
            firstName
            lastName
        }
    }
`;

export const GET_USERS = gql`
    query GetUsers($adminId: ID) {
        getUsers(adminId: $adminId) {
            id
            email
            token
            firstName
            lastName
        }
    }
`;

export const FIND_USER = gql`
    query User($userId: ID) {
        user(userId: $userId) {
            id
            email
            token
            firstName
            lastName
        }
    }
`;

