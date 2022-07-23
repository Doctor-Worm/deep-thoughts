const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // get thought by username. if no username, return all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find().sort({ createdAt: -1 });
        },
        // get single thought by _id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__V -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        login: async () => {
            
        }
    }
};

module.exports = resolvers;