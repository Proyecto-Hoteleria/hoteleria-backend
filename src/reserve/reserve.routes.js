// reserve.routes.js
import express from 'express'; // Importa Express
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'; // Middleware para validar JWT y roles
import { addReserve, getReserves, updateReserve, deleteReserve } from './reserve.controller.js'; // Importa las funciones del controlador

const api = express.Router(); // Crea un nuevo enrutador de Express

// Rutas para reservas
api.post('/addReserve', validateJwt, addReserve); // Cualquier usuario autenticado puede agregar una reserva
api.get('/getReserves', validateJwt, getReserves); // Usuarios autenticados obtienen sus propias reservas; administradores obtienen todas
api.put('/updateReserve/:id', validateJwt, updateReserve); // Usuarios autenticados actualizan solo sus reservas; administradores pueden actualizar cualquiera
api.delete('/deleteReserve/:id', validateJwt, deleteReserve); // Usuarios autenticados eliminan solo sus reservas; administradores pueden eliminar cualquiera

export default api; // Exporta el enrutador para uso en la aplicación principal