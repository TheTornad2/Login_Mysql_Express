import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';

// Archivos
import router from './routes/homeLogin.routes.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Vistas

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));
app.use(morgan('dev'));
// Rutas

app.use(router);

app.listen(port);
console.log(`El servidor está siendo escuchado en el puerto ${port}`);
