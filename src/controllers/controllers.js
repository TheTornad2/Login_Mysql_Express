import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';

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
  {
    id: 4,
    nombre: 'Lisette',
  },
  {
    id: 5,
    nombre: 'Miguel Angel',
  },
];

// Registro de usuarios

export const register = (req, res) => {
  res.render('register');
};

// Introducción de los datos del formulario a una base de datos

export const postRegister = async (req, res) => {
  try {
    const { usuario, contraseña, email } = req.body;

    let passwordHash = await bcrypt.hash(contraseña, 10);

    const [rows] = await pool.query(
      'INSERT INTO usuarios (usuario, contraseña, email) VALUES (?, ?, ?)',
      [usuario, passwordHash, email]
    );

    res.render('login', {
      message: `Hola ${usuario} ya puedes loguearte con tu cuenta`,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
    });
  }
};

export const dashboard = (req, res) => {
  res.render('dashboard', { personas: personas });
};

export const login = (req, res) => {
  res.render('login', { message: '' });
};

//! CONFIGURACIÓN DEL PASSPORT PARA AUTENTIFICAR LA SESIÓN

// Login de usuario

export const postLogin = async (req, res) => {
  const { usuario, contraseña } = req.body;

  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [
    usuario,
  ]);

  if (rows.length === 1) {
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(contraseña, user.contraseña); // Cambiado a contraseña en lugar de password

    if (passwordMatch) {
      console.log('Autenticación exitosa');
      res.redirect('/dashboard'); // Agregado el '/' en '/dashboard'
    } else {
      res.status(500).json({
        message: 'Error, contraseña incorrecta',
      });
    }
  } else {
    res.status(500).json({
      message: 'Usuario no encontrado',
    });
  }
};
