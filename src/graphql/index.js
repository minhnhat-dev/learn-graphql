'use strict'
const UserSchema = require('./schemas/users/index');
const PostSchema = require('./schemas/posts');
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
  UserSchema,
  PostSchema
]

const typeDefs = schemas.map((schema) => schema.types);
const resolvers = schemas.map((schema) => schema.resolvers);
module.exports = {
  typeDefs,
  resolvers,
};
