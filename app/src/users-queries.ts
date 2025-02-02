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
            storeId
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

export const UPDATE_USER = gql`
    mutation UpdateUser($user: UpdateUserInput) {
        updateUser(user: $user) {
            success
            message
            data
        }
    }
`;

export const DESTROY_USER = gql`
    mutation DestroyUser($id: ID) {
        destroyUser(id: $id) {
            success
            message
            data
        }
    }
`;