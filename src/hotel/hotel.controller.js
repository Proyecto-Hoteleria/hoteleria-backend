'use strict'

import Hotel from './hotel.model.js' // Importando el modelo de Hotel
import { checkUpdate } from '../utils/validator.js' // Importando la función checkUpdate desde validators

// Función para registrar un nuevo hotel
export const registerHotel = async (req, res) => {
    try {
        let data = req.body

        // Verificar si el hotel ya está registrado
        let existingHotel = await Hotel.findOne({ name: data.name })
        if (existingHotel) {
            return res.status(400).send({ message: 'The hotel is already registered.' })
        }

        // Crear un nuevo hotel
        let hotel = new Hotel(data)

        // Guardar el hotel en la base de datos
        await hotel.save()

        return res.status(201).send({ message: 'Hotel registered successfully.', hotel: hotel })
    } catch (err) {
        console.error('Error registering the hotel:', err)
        return res.status(500).send({ message: 'An error occurred while registering the hotel.', err })
    }
}

// Función para obtener todos los hoteles registrados
export const getAllHotels = async (req, res) => {
    try {
        let hotels = await Hotel.find()
        return res.send({ message: 'This is the list of hotels', hotels })
    } catch (err) {
        console.error('Error getting hotels:', err)
        return res.status(500).send({ message: 'An error occurred while getting the hotels.' })
    }
}

// Función para obtener un hotel por su nombre
export const getHotelByName = async (req, res) => {
    try {
        let { name } = req.body
        let regex = new RegExp(name, 'i')
        let hotel = await Hotel.findOne({ name: regex })
        if (!hotel) {
            return res.status(404).send({ message: 'Hotel not found.' })
        }
        return res.send({ message: 'This is the list of hotel', hotel })
    } catch (err) {
        console.error('Error getting the hotel by its name:', err)
        return res.status(500).send({ message: 'An error occurred while getting the hotel by its name.' })
    }
}

// Función para actualizar la información de un hotel
export const updateHotel = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) {
            return res.status(400).send({ message: 'Could not update the hotel.' })
        }
        let updatedHotel = await Hotel.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!updatedHotel) {
            return res.status(404).send({ message: 'Hotel not found.' })
        }
        return res.send({ message: 'Hotel updated successfully.', hotel: updatedHotel })
    } catch (err) {
        console.error('Error updating the hotel:', err)
        return res.status(500).send({ message: 'An error occurred while updating the hotel.', err })
    }
}

// Función para eliminar un hotel por su ID
export const deleteHotel = async (req, res) => {
    try {
        let { id } = req.params
        let deletedHotel = await Hotel.findByIdAndDelete({ _id: id })
        if (!deletedHotel) {
            return res.status(404).send({ message: 'Hotel not found.' })
        }
        return res.send({ message: 'Hotel deleted successfully.', hotel: deletedHotel })
    } catch (err) {
        console.error('Error deleting the hotel:', err)
        return res.status(500).send({ message: 'An error occurred while deleting the hotel.' })
    }
}