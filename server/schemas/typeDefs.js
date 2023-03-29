const { gpl } = require('apollo-server-express');

const typeDefs = gpl`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }
    
    input savedBook {
        bookId: String!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    typeAuth {
        token: ID!
        user: User
    }

    typeQuery {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook(bookId: ID!): User
    }`;

    module.exports = typeDefs;