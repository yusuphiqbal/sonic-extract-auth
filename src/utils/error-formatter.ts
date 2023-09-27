import { ErrorFormatter } from 'express-validator';

const errorFormater: ErrorFormatter = (error) => {
  if (error.type !== 'field') return { msg: error.msg };
  return { path: error.path, msg: error.msg };
};

export default errorFormater;
