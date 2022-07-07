import Sequelize from 'sequelize';
import db from '../config/db.js';

// Crear el modelo
export const Testimonial = db.define('testimoniales', {
  // Importante, si no se define alguna de las columnas de la BDD aqui, la consulta no la va a traer. El id lo trae por defecto
  nombre: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  mensaje: {
    type: Sequelize.STRING
  }
});