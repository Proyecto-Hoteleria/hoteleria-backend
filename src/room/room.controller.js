'use strict'

import Room from './room.model.js' // Importando el modelo de Room
import Hotel from '../hotel/hotel.model.js' // Importando el modelo de Hotel
import { checkUpdate } from '../utils/validator.js' // Importando la función checkUpdate desde validators

// Función para registrar una nueva habitación
export const registerRoom = async (req, res) => {
    try {
        let data = req.body

        // Verificar si el hotel existe
        let hotel = await Hotel.findById(data.hotel)
        if (!hotel) {
            return res.status(400).send({ message: 'The hotel does not exist.' })
        }

        // Crear una nueva habitación
        let room = new Room(data)

        // Guardar la habitación en la base de datos
        await room.save()

        return res.status(201).send({ message: 'Room registered successfully.', room: room })
    } catch (err) {
        console.error('Error registering the room:', err)
        return res.status(500).send({ message: 'An error occurred while registering the room.', err })
    }
}

// Función para obtener todas las habitaciones registradas
export const getAllRooms = async (req, res) => {
    try {
        let rooms = await Room.find().populate('hotel')
        return res.send({ message: 'This is the list of rooms', rooms })
    } catch (err) {
        console.error('Error getting rooms:', err)
        return res.status(500).send({ message: 'An error occurred while getting the rooms.' })
    }
}

// Función para obtener una habitación por su ID
export const getRoomById = async (req, res) => {
    try {
        let { id } = req.params
        let room = await Room.findById(id).populate('hotel')
        if (!room) {
            return res.status(404).send({ message: 'Room not found.' })
        }
        return res.send({ message: 'This is the room', room })
    } catch (err) {
        console.error('Error getting the room by its ID:', err)
        return res.status(500).send({ message: 'An error occurred while getting the room by its ID.' })
    }
}

// Función para actualizar una habitación
export const updateRoom = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) {
            return res.status(400).send({ message: 'Could not update the room.' })
        }
        let updatedRoom = await Room.findByIdAndUpdate({ _id: id }, data, { new: true }).populate('hotel')
        if (!updatedRoom) {
            return res.status(404).send({ message: 'Room not found.' })
        }
        return res.send({ message: 'Room updated successfully.', room: updatedRoom })
    } catch (err) {
        console.error('Error updating the room:', err)
        return res.status(500).send({ message: 'An error occurred while updating the room.', err })
    }
}

// Función para eliminar una habitación por su ID
export const deleteRoom = async (req, res) => {
    try {
        let { id } = req.params
        let deletedRoom = await Room.findByIdAndDelete({ _id: id })
        if (!deletedRoom) {
            return res.status(404).send({ message: 'Room not found.' })
        }
        return res.send({ message: 'Room deleted successfully.', room: deletedRoom })
    } catch (err) {
        console.error('Error deleting the room:', err)
        return res.status(500).send({ message: 'An error occurred while deleting the room.' })
    }
}