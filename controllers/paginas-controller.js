import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {

    // Cuando tengo múltiples consultas a la DB, como utilizo async no es performante utilizar múltiples
    // awaits. Se resuvelve con Promise.all, incluyendo todas las consultas en un array para que estas
    // comiencen a ejecutarse al mismo tiempo
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio.pug', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });        
    } catch (error) {
        console.log(error);
    }

};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    // Consulto DB para pasar info a la vista de Viajes
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
};

const paginaDetalleViaje = async (req, res) => {
    console.log(req.params);

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug: slug }});

        res.render('viaje', {
            pagina: 'Información Viaje', 
            viaje
        })
        
    } catch (error) {
        console.log(error);
    }

};

const paginaTestimonios = async (req, res) => {
    // Consultar DB y mostrar testimonios
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimonios',
            testimoniales
        });        
    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimonios
};