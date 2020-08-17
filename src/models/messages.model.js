const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Status = Object.freeze({
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
});

const MessageSchema = new Schema(
  {
    userId: {
      type: ObjectId, ref: 'User',
    },
    message: {
      type: String,
    },
    status: Boolean,
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

Object.assign(MessageSchema.statics, { Status });

module.exports = mongoose.model(
  'Message',
  MessageSchema,
  'messages',
);
