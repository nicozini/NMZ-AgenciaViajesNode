import { Testimonial } from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res) => {
    console.log(req.body);

    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
        errores.push({ mensaje: 'Todos los campos deben estar completos' });
    }

    if (errores.length > 0) {
        // Consultar testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista, pasar errores, y old values
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })

    } else {
        // Todo bien, lo almaceno en la DB: crear tabla y modelo
        
        try {
            await Testimonial.create({
                nombre,
                correo,
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