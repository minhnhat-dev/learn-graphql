/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const { UserService, PostService } = require('../../../services');
const { BcryptUtils, CommonUtils } = require('../../../utils');
const {UserInputError} = require('apollo-server-express');
const graphqlFields = require('graphql-fields');

const UserResolvers = {

  User: {
    id: (user) => user._id,
    posts: async ({_id}, args, {dataLoaders}, info) => {
      const {getPosts} = dataLoaders.usersDataLoader;
      return getPosts.load(_id);
    }
  },
  Query: {
    users: async (root, args, context, info) => {
      const select = CommonUtils.getMongooseSelectionFromRequest(info);
      return UserService.find({}, {select});
    },
    user: async (root, { id }) => {
      UserService.findOne({ _id: id });
    }
  },
  Mutation: {
    register: async (root, { name, email, password }) => {
      const count = await UserService.count({ email });
      if (count) {
        throw new UserInputError('Email is exist');
      }
      const user = await UserService.create({ name, email, password });
      /* register token */
      const token = UserService.sign({ id: user.id });
      return {
        token,
        user,
      };
    },
    login: async (root, { email, password }) => {
      const user = await UserService.findOne({ email });

      if (!user) {
        throw new UserInputError('Invalid email');
      }
      const correctPassword = BcryptUtils.comparePassword(password, user.password);

      if (!correctPassword) {
        throw new UserInputError('Invalid password');
      }
      return {
        token: UserService.sign({ id: user._id }),
        user,
      };
    },
  },

};

module.exports = UserResolvers;
