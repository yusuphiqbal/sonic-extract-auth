import { Document, Schema, model } from 'mongoose';

import User from '../interfaces/user';

interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users', timestamps: true },
);

export default model<UserDocument>('User', userSchema);
