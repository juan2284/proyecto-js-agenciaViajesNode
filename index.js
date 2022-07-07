// La sintaxis de Common JS: Esta sintaxis no es nativa de JS pero Node y Express la adoptaron porque es la forma en que se lograba modularizar el código antes.
// const express = require('express');

// Con la sintaxis de imports. Para que funcione en el package debemos informar que queremos utilizar los módulos colocando "type": "module"
import express from 'express';
// Nos traemos el archivo de router 
import router from './routes/index.js';
// Importar la conexión a la BDD
import db from './config/db.js';
// Importar las variables de entorno
import dotenv from 'dotenv';

// Esta instrucción me permitirá leer el archivo .env. También en el import se puede poner la ruta dotenv/config y prescindir de esta linea
dotenv.config();

// Como leer las variables de entorno. Este código lo necesito en el archivo de configuración de la BDD
// console.log(process.env.DB_HOST);

const app = express();

// Conectar a la BDD
db.authenticate()
  .then(() => console.log('Base de Datos Conectada'))
  .catch(error => console.log(error));


// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Crear un middleware propio
// Obtener el año actual. Next permite ir de un middleware al otro para que no se paralice la cadena de ejecución.
// Request: Lo que se envía al servidor
// Response: Lo que se recibe desde el servidor
// Next: Se terminó la ejecución, pasemos a la siguiente línea de código
app.use((req, res, next) => {
  // console.log(res);
  // Locals son como variables internas de express que nos permiten pasar información de un archivo a otro en Express
  // res.locals.unaVariable = 'Una nueva Variable';
  // console.log(res.locals);
  const year = new Date();
  res.locals.actualYear = year.getFullYear();

  res.locals.nombreSitio = 'Agencia de Viajes';

  
  // Cuando el next por alguna razón no funciona, se puede forzar colocando return next();
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica. De esta forma el proyecto tendrá acceso a los archivos dentro de la carpeta en donde estarán los archivos estáticos.
app.use(express.static('public'));

// Agregar el router
// Usamos use ya que engloba todos los verbos de http
// Lo que digo con la siguiente instruccion es que a partir de la diagonal agregue todas las rutas que tengo establecidas en el archivo y con use me aseguro que soporte todos los verbos http
app.use('/', router);

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`); 
});