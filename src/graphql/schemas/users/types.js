const { gql } = require('apollo-server-express');

const UserType = gql`
  type User {
    id: ID
    name: String
    email: String
    totalPosts: String
    active: Boolean
  }

  type UserAuth {
    token: String,
    user: User
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, name: String!): User
  }
`;

module.exports = UserType;
