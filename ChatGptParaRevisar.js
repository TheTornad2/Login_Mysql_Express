const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // Importa la conexión a la base de datos

const app = express();
app.use(express.json());

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busca al usuario en la base de datos por nombre de usuario
    const selectQuery = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(selectQuery, [username], async (error, results) => {
      if (error) {
        console.error('Error al buscar usuario: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else if (results.length === 0) {
        res
          .status(401)
          .json({ error: 'Nombre de usuario o contraseña incorrectos' });
      } else {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Contraseña válida, el usuario ha iniciado sesión con éxito
          res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
          // Contraseña incorrecta
          res
            .status(401)
            .json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
