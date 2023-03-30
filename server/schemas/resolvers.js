const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User 
                    .findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')
                return userData;
            };
            throw new AuthenticationError('User not found')
        },
    },

    Mutation: {
        //login with email and password as parameters
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('No user found');
        }
        //authentication with password comparison
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect password')
        }

        const token = signToken(user);
        return { token, user }
        },

        //creates a user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        }, 
        //add a new book to the users array of saved books.
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User
                .findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData} },
                    { new: true },
                ).populate('books');
                return updatedUser;
            };
            throw new AuthenticationError('Log in to save books')
        },
        //removes a book from the users array of saved books by its id.
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true },
                );
                return updatedUser;
            };
            throw new AuthenticationError('Log in to delte books')
        }
    },
};

module.exports = resolvers;