// reserve.controller.js
import Reserve from './reserve.model.js'; // Importa el modelo de reserva
import mongoose from 'mongoose'; // Para las operaciones con el esquema de reserva

// Agregar una nueva reserva (cualquier usuario autenticado)
export const addReserve = async (req, res) => {
    try {
        const userId = req.uid; // ID del usuario autenticado
        const data = { ...req.body, user: userId }; // Asegura que el usuario autenticado es el que hace la reserva
        const newReserve = new Reserve(data); // Crea una nueva reserva
        await newReserve.save(); // Guarda la reserva en la base de datos
        return res.status(201).send({ message: 'Reservation added successfully', newReserve }); // Respuesta exitosa
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding reservation', error: err.message });
    }
};

// Obtener reservas (administradores obtienen todas, usuarios autenticados obtienen solo las suyas)
export const getReserves = async (req, res) => {
    try {
        const userId = req.uid; // ID del usuario autenticado
        const isAdmin = req.isAdmin; // Determina si el usuario es administrador
        let reserves;

        if (isAdmin) {
            reserves = await Reserve.find().populate('user room hotel'); // Todas las reservas para administradores
        } else {
            reserves = await Reserve.find({ user: userId }).populate('room hotel'); // Reservas del usuario autenticado
        }

        return res.send({ message: 'Reservations fetched successfully', reserves }); // Respuesta exitosa
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching reservations', error: err.message });
    }
};

// Actualizar una reserva (administradores o el propietario de la reserva)
export const updateReserve = async (req, res) => {
    try {
        const userId = req.uid; // ID del usuario autenticado
        const isAdmin = req.isAdmin; // Determina si el usuario es administrador
        const { id } = req.params; // ID de la reserva a actualizar
        const data = req.body;

        const reserve = await Reserve.findById(id); // Busca la reserva por ID

        if (!reserve) {
            return res.status(404).send({ message: 'Reservation not found' }); // Si no se encuentra la reserva
        }

        // Si no es administrador, verifica que sea el propietario de la reserva
        if (!isAdmin && reserve.user.toString() !== userId) {
            return res.status(403).send({ message: 'Unauthorized to update this reservation' });
        }

        const updatedReserve = await Reserve.findByIdAndUpdate(id, data, { new: true }); // Actualiza la reserva

        return res.send({ message: 'Reservation updated successfully', updatedReserve }); // Respuesta exitosa
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating reservation', error: err.message });
    }
};

// Eliminar una reserva (administradores o el propietario de la reserva)
export const deleteReserve = async (req, res) => {
    try {
        const userId = req.uid; // ID del usuario autenticado
        const isAdmin = req.isAdmin; // Determina si es administrador
        const { id } = req.params; // ID de la reserva a eliminar

        const reserve = await Reserve.findById(id); // Busca la reserva por ID

        if (!reserve) {
            return res.status(404).send({ message: 'Reservation not found' }); // Si no se encuentra la reserva
        }

        // Verifica que solo el administrador o el propietario de la reserva pueda eliminarla
        if (!isAdmin && reserve.user.toString() !== userId) {
            return res.status(403).send({ message: 'Unauthorized to delete this reservation' });
        }

        await Reserve.findByIdAndDelete(id); // Elimina la reserva
        return res.send({ message: 'Reservation deleted successfully' }); // Respuesta exitosa
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting reservation', error: err.message });
    }
};
