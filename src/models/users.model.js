const mongoose = require('mongoose');
const { BcryptUtils } = require('../utils');

const { Schema } = mongoose;

const Status = Object.freeze({
  inactive: 'inactive',
  active: 'active',
  deleted: 'deleted',
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    active: { type: String, default: 'active' },
    totalPosts: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

/**
 * Hook hide field safe
 */

UserSchema.method('toJSON', function () {
  const user = this.toObject();
  delete user.password;
  return user;
});
/**
* Hook before save
* Hash password
*/
UserSchema.pre('save', function (next) {
  if (this.password) {
    this.password = BcryptUtils.hashPassword(this.password);
  }
  next();
});

Object.assign(UserSchema.statics, { Status });

module.exports = mongoose.model(
  'User',
  UserSchema,
  'users',
);
