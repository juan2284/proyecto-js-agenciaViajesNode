// Importante que cuando el proyecto se empiece a llenar de rutas, es recomendable llevarlas a su propio documento
// Importante, en el archivo index.js de la raiz tengo instanciado express como app. Al venir a otro archivo, no puedo instanciar de nuevo express, solo debo tener una instancia. Por lo que aqui solo importaremos express y definiremos el router
import express from 'express';
// Importar los controllers de las páginas
import {paginaInicio,
        paginaNosotros,
        paginaViajes,
        paginaTestimoniales,
        paginaDetalleViaje}
from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

// Aqui definimos el router, utilizando la instancia de express ya realizada en el documento de la raiz y utilizando su router
const router = express.Router();
// 
// 
// Se utiliza request, response y algo llamado next. Request es la petición que se envía, Response es la respuesta de Express
// router.get('/', (req, res) => {
//   // Se puede crear una respuesta personalizada. Con send enviamos una respuesta estática, pero con res.json() estaríamos enviando un json y funcionaría de la misma forma. Esto es como cuando creabamos las respuesta en Laravel, que eran tambien unos jsons. El mas utilizada es res.render() que se utiliza para mostrar una vista.


//   res.render('inicio', {
//     pagina: 'Inicio'
//   });
// });
router.get('/', paginaInicio);
// 
// Al hacer esto podemos ingresar a las rutas indicadas en el navegador facilmente
// router.get('/nosotros', (req, res) => {

//   // const viajes = 'Cambiando el texto';

//   // Al usar render ya se espera el nombre de una vista. Luego del nombre podemos pasar un objeto con los datos que deseemos pasarle a la vista.
//   res.render('nosotros', {
//     pagina: 'Nosotros'
//   });
// });
router.get('/nosotros', paginaNosotros);
// 
// router.get('/viajes', (req, res) => {
//   res.render('viajes', {
//     pagina: 'Viajes'
//   });
// });
router.get('/viajes', paginaViajes);
// Vamos a crear un routing para la visita de las url's de cada uno de los viajes
router.get('/viajes/:slug', paginaDetalleViaje);
// 
// router.get('/testimoniales', (req, res) => {
//   res.render('testimoniales', {
//     pagina: 'Testimoniales'
//   });
// });
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);
// 
// router.get('/contacto', (req, res) => {
//   res.send('Contacto');
// });

export default router;