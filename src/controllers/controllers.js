import { pool } from '../db.js';

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

export const register = (req, res) => {
  res.render('register');
};

export const login = (req, res) => {
  res.render('login', { message: '' });
};

export const postLogin = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    res.render('mainPage', { username: username, personas: personas });
  } else {
    res.render('login', { message: 'Usuario o contraseña incorrecta' });
  }
};
