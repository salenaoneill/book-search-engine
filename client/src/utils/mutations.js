import { gql } from '@apollo/client';

//execute loginUser mutation
export const LOGIN_USER = gql`
    mutation login($email: String! $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

//execute addUser mutation
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

//execute saveBook mutation
export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

//execute removeBook mutation
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;