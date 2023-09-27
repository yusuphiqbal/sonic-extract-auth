import { RequestHandler } from 'express';

const notFound: RequestHandler = (_, res) => {
  return res.status(404).json({
    msg: 'The requested endpoint was not found on the server.',
  });
};

export default notFound;
