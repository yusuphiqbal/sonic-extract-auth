import { body } from 'express-validator';

const email = body('email')
  .trim()
  .isEmail()
  .withMessage('Please enter a valid email address.')
  .normalizeEmail({ all_lowercase: true });

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('Please enter your password.');

export const login = [email, password];
