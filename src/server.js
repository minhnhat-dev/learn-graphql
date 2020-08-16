const config = require('../config');
const logger = require('./helpers/logger');
const { ApolloServer, ApolloError } = require('apollo-server-express');
const GraphQL = require('./graphql');
const Models = require('./models');
const Services = require('./services');
const ErrorHandler = require('./helpers/errorHandler');
const {formatError} = require('apollo-errors');
const dataLoaders = require('./data-loaders');

const server = new ApolloServer({
  typeDefs: GraphQL.typeDefs,
  resolvers: GraphQL.resolvers,
  context: async ({ req }) => {
    return {
      Models,
      Services,
      req,
      dataLoaders,
    };
  },
  formatError: (error) => {
    return formatError(error)
  },
  cacheControl: {
    defaultMaxAge: 5,
  },
  introspection: true,
  playground: true,
  tracing: true,
  batching: true,
});

const app = require('./app');

server.applyMiddleware({
  app,
  // change this if you wnat to host schema on a different path
  path: '/',
});

// Here you set the PORT and IP of the server
const port = config.PORT || 8001;
const ip = config.IP || '127.0.0.1';

app.listen({ port, ip }, () =>
  logger.info(`🚀 Server ready at http://${ip}:${port}${server.graphqlPath}`),
);

module.exports = app;
