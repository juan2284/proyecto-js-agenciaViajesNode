// Importar el modelo
import { Viaje } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {

  // El promise para hacer la consulta multiple:
  const promiseDB = [];

  promiseDB.push( Viaje.findAll({limit: 3}) );
  promiseDB.push( Testimonial.findAll({limit: 3}) );

  // Consultar 3 viajes del modelo Viaje
  try {
    // El limit: 3 limita la cantidad de resultados que devuelve la consulta. Importante al hacer multiples consultas, al ser un async-await la primera consulta bloquea el res.render hasta que haya finalizado la consulta lo que crearía problemas al mostrar la vista si la consulta se tarda. Entonces para poder ejecutar las dos consultas que necesito, lo puedo hacer a través de un promise. esto permite una mejora deñ performance bastante grande porque en lugar de bloquear una consulta mientras se ejecuta otra, se ejecutan ambas al mismo tiempo. Es importante entender que esto se hace porque ambas son independientes la una de la otra. Si una dependiera de la otra, estaría bien bloquear una mientras se ejecuta la otra.
    const resultado = await Promise.all(promiseDB);

    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
    });

  } catch (error) {
    console.log(error);
  }

}

const paginaNosotros = (req, res) => {
  res.render('nosotros', {
    pagina: 'Nosotros'
  });
}

const paginaViajes = async (req, res) => {

  // Consultar BDD
  const viajes = await Viaje.findAll();


  res.render('viajes', {
    pagina: 'Próximos Viajes',
    // Aqui podemos pasar el resultado de la consulta a la BDD que es un arreglo
    viajes
  });
}

const paginaTestimoniales = async (req, res) => {

  try {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      testimoniales
    });    
  } catch (error) {
    console.log(error);
  }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{
  const {slug} = req.params;

  try {
    const viaje = await Viaje.findOne({where: {slug}});

    res.render('viaje', {
      pagina: 'Información Viaje',
      viaje
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}