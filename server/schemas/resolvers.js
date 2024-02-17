const { User, Lift } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => { return User.find().populate('lifts'); },

        user: async (_, { username }) => User.findOne({ username }).populate('Lifts'),

        lifts: async () => { return Lift.find(); },

        lift: async (_, { liftId }) => Lift.findbyId(liftId),

        me: async (_, __, { user }) => {
            if (user) {
                return User.findById(user._id).populate('lifts');
            }
            throw new AuthenticationError('You are not authenticated.');
        },
    },

    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect email or password.');
            }
            const token = signToken(user);
            return { token, user };
        }
    }


}
