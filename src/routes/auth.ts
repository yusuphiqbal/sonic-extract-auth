import { Router } from 'express';

import * as controller from '../controllers/auth';
import * as validators from '../validators/auth';

const router = Router();

router.post('/login', validators.login, controller.login);

export default router;
