const { PostsModel } = require('../models');

const count = async (query) => PostsModel.countDocuments({ query });

const create = async (post) => PostsModel.create(post);

const update = (id, data) => PostsModel.updateOne({ _id: id }, { $set: data });

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return PostsModel.findOne(query).lean().select(select || {}).exec();
};

const deleteOne = async (id) => PostsModel.deleteOne({ _id: id });

const find = async (filter = {}, options = {}) => PostsModel.find(filter).setOptions(options).lean().exec();

module.exports = {
  count,
  find,
  create,
  update,
  findOne,
  deleteOne,
};
