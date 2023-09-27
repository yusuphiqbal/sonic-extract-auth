import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { LoginInput } from '../interfaces/input';
import User from '../models/user';
import errorFormater from '../utils/error-formatter';
import JWTPayload from '../interfaces/jwt-payload';

export const login: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormater);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  const input: LoginInput = req.body;

  let user;

  try {
    user = await User.findOne({ email: input.email });
  } catch (error) {
    return next(error);
  }

  if (!user) {
    return res.status(400).json([
      {
        path: 'email',
        msg: 'User not found.',
      },
    ]);
  }

  let passwordsMatch;

  try {
    passwordsMatch = await bcrypt.compare(input.password, user.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordsMatch) {
    return res.status(400).json([
      {
        path: 'password',
        msg: 'Incorrect password, please try again.',
      },
    ]);
  }

  const access: JWTPayload = { _id: user._id.toString() };
  const accessOptions: SignOptions = { expiresIn: config.get('jwt.access') };
  const secret: Secret = config.get('jwt.secret');

  return jwt.sign(access, secret, accessOptions, (error, accessToken) => {
    if (error) return next(error);
    return res.status(200).json({ accessToken });
  });
};
