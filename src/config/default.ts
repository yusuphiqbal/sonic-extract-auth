import 'dotenv/config';

export default {
  bcrypt: {
    rounds: 10,
  },
  jwt: {
    access: 86400,
    secret: process.env.JWT_SECRET,
  },
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
};
