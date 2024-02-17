const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    lifts: [Lift]
}

type Lift {
    _id: ID
    liftName: String
    weight: Int
    sets: Int
    reps: Int
    user: User
    DateTime: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    lifts: [Lift]
    lift(liftId: ID!): Lift
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLift(liftName: String!, weight: Int!, sets: Int!, reps: Int!, DateTime: String!): Lift
    removeLift(liftId: ID!): Lift
    updateUser(username: String, email: String, password: String): User
    removeUser: User
}

`;

module.exports = typeDefs;