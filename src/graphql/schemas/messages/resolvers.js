 
const mongoose = require('mongoose');
const { UserService, PostService } = require('../../../services');
const {CommonUtils} = require('../../../utils');
require('apollo-cache-control');
const { PubSub, UserInputError } = require('apollo-server-express');

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

const MessageResolvers = {
  Subscription: {
    messageAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
  Query: {
    posts(root, args, context) {
      return postController.posts();
    },
  },
  Mutation: {
    createMessage: async (root, args, context) => {
      const {message, userId} = args;
      const {MessagesModel} = context.Models;
      const user = UserService.findOne({_id: userId});
      if(!user) {
        throw new UserInputError('userId invalid')
      }
      const messageSaved = await MessagesModel.create({userId, message});

      pubsub.publish(MESSAGE_ADDED, { messageAdded: messageSaved });
      return messageSaved;
    },
  },
};

module.exports = MessageResolvers;