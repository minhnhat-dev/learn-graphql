const { UsersModel } = require('../models');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const secret = 'secret';

const sign = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });

const count = async (query) => UsersModel.countDocuments(query);

const create = async (user) => UsersModel.create(user);

const update = (id, data) => UsersModel.updateOne({ _id: id }, { $set: data });

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return UsersModel.findOne(query).lean().exec();
};

const find = async (filter = {}, options) => {
  const { skip, limit } = options;
  return UsersModel.find(filter).setOptions({ skip, limit }).lean().exec();
};

const getUserByToken = async (token) => {
  if (!token) {
    return {
      user: null,
    };
  }
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const { id } = decodedToken;
    const user = await UsersModel.findOne({ _id: id });
    return { user };
  } catch (e) {
    console.log(e);
    throw new AuthenticationError('Unauthorized');
  }
};

module.exports = {
  count,
  find,
  create,
  update,
  findOne,
  getUserByToken,
  sign
};
