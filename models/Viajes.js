import Sequelize from 'sequelize';
import db from '../config/db.js';

// Crear el primer modelo
export const Viaje = db.define('viajes', {
  // Importante, si no se define alguna de las columnas de la BDD aqui, la consulta no la va a traer
  titulo: {
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.STRING
  },
  fecha_ida: {
    type: Sequelize.DATE
  },
  fecha_vuelta: {
    type: Sequelize.DATE
  },
  imagen: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING
  },
  disponibles: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  }
});