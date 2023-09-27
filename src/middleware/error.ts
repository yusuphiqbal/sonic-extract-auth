import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) return next(err);

  const code = res.statusCode === 200 ? 500 : res.statusCode;
  const inProduction = process.env.NODE_ENV === 'production';
  const msg = inProduction ? 'Server error.' : err.msg || 'Server error.';

  return res.status(code).json({ msg });
};

export default error;
