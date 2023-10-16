import { Router } from 'express';
import {
  register,
  login,
  postLogin,
  postRegister,
  dashboard,
} from '../controllers/controllers.js';
const router = Router();

router.get('/dashboard', dashboard);

router.get('/register', register);

router.post('/register', postRegister);

router.get('/login', login);

router.post('/login', postLogin);

export default router;
