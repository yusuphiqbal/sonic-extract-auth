import config from 'config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import notFound from './middleware/not-found';

mongoose.set('strictQuery', true);
mongoose.connect(config.get('mongoUri')).catch(() => process.exit(1));

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(config.get('morgan.format')));

app.use(notFound);

const port = config.get('port');

app.listen(port, () =>
  console.log(`🚀 Auth service listening on port ${port}`),
);
