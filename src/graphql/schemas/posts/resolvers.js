 
const mongoose = require('mongoose');
const { UserService, PostService } = require('../../../services');
const {CommonUtils} = require('../../../utils');
require('apollo-cache-control');

const PostResolvers = {
  Post: {
    author: async ({ userId }, args, context, info) => {
      const select = CommonUtils.getMongooseSelectionFromRequest(info)
      return UserService.findOne({ _id: userId }, { select });
    },
  },
  Query: {
    post: async (root, { id }) => PostService.findOne({ _id: id }),
    posts: async (root, { content }, context, info) => {
        const select = CommonUtils.getMongooseSelectionFromRequest(info)
        info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
      const query = {};
      if (content) {
        query.content = content;
      }
      return PostService.find(query);
    },
  },
  Mutation: {
    createPost: async (root, { content, userId }) => {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      return PostService.create({ content, userId: userObjectId });
    },
    deletePost: async (root, { id }) => PostService.deleteOne(id),
  },
};

module.exports = PostResolvers;