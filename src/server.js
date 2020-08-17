const config = require('../config');
const logger = require('./helpers/logger');
const { ApolloServer, ApolloError } = require('apollo-server-express');
const GraphQL = require('./graphql');
const Models = require('./models');
const Services = require('./services');
const ErrorHandler = require('./helpers/errorHandler');
const {formatError} = require('apollo-errors');
const dataLoaders = require('./data-loaders');
const http = require('http');

const server = new ApolloServer({
  typeDefs: GraphQL.typeDefs,
  resolvers: GraphQL.resolvers,
  context: async ({ req, connection }) => {
    if(connection) {
      return connection.context;
    }
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

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
// Here you set the PORT and IP of the server
const port = config.PORT || 8001;
const ip = config.IP || '127.0.0.1';

httpServer.listen({ port, ip }, () =>
  console.log(`🚀 Server ready at http://${ip}:${port}${server.graphqlPath}`),
  console.log(`Subscriptions ready at ws://${ip}:${port}${server.subscriptionsPath}`)
);

module.exports = app;
