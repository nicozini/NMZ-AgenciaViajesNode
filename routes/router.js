import express from 'express';
import { 
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimonios
} from '../controllers/paginas-controller.js';
import { guardarTestimonial } from '../controllers/testimonial-controller.js';
 
const router = express.Router();

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimonios);

// Ruta a formulario de testimoniales
router.post('/testimoniales', guardarTestimonial);

export default router;