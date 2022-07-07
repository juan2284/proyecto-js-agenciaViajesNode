import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

  // Validar Formulario
  const {nombre, email, mensaje} = req.body;

  // Arreglo para los errores de validación
  const errores = [];

  if(nombre.trim() === ''){
    errores.push({mensaje:'El Nombre está vacío'});
  }

  if(email.trim() === ''){
    errores.push({mensaje:'El Email está vacío'});
  }

  if(mensaje.trim() === ''){
    errores.push({mensaje:'El Mensaje está vacío'});
  }

  if(errores.length > 0){
    // Consultar testimoniales existentes
    const testimoniales = await Testimonial.findAll();

    // Mostrar la Vista con errores
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      errores,
      // Le vamos a pasar los valores de los input para que cuando lance un error por algún campo vacío estos valores se recuperen
      nombre,
      email,
      mensaje,
      testimoniales
    });
  } else {
    // Almacenar los datos en la BDD
    try {
      await Testimonial.create({
        nombre,
        email,
        mensaje
      });

      res.redirect('/testimoniales');
    } catch (error) {
      console.log(error);
    }
  }
}



export {
  guardarTestimonial
}