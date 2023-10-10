import { Router } from 'express';
import { register, login, postLogin } from '../controllers/controllers.js';
const router = Router();

let personas = [
  {
    id: 1,
    nombre: 'Ayrton Bryant',
  },
  {
    id: 2,
    nombre: 'Wilbert Toribio',
  },
  {
    id: 3,
    nombre: 'Jesed PHP',
  },
];

router.get('/register', register);

router.get('/login', login);

router.post('/login', postLogin);

export default router;
