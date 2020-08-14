'use strict'
const UserSchema = require('./schemas/users/index');

const baseSchemas = {};
baseSchemas.types = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

baseSchemas.resolvers = {};
const schemas = [
  baseSchemas,
  UserSchema
]

const typeDefs = schemas.map((schema) => schema.types);
const resolvers = schemas.map((schema) => schema.resolvers);
module.exports = {
  typeDefs,
  resolvers,
};
