'use strict';

import Event from './event.model.js'; 
import Hotel from './hotel.model.js'; 
import { checkUpdate } from '../utils/validator.js'; 

// Function to register a new event
export const registerEvent = async (req, res) => {
    try {
        let data = req.body;

        // Verify if the hotel exists
        let hotel = await Hotel.findById(data.id_hotel);
        if (!hotel) {
            return res.status(400).send({ message: 'The hotel does not exist.' });
        }

        // Create a new event
        let event = new Event(data);

        // Save the event in the database
        await event.save();

        return res.status(201).send({ message: 'Event registered successfully.', event: event });
    } catch (err) {
        console.error('Error registering the event:', err);
        return res.status(500).send({ message: 'An error occurred while registering the event.', err });
    }
}

// Function to get all registered events
export const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find().populate('id_hotel');
        return res.send({ message: 'This is the list of events', events });
    } catch (err) {
        console.error('Error getting events:', err);
        return res.status(500).send({ message: 'An error occurred while getting the events.' });
    }
}

// Function to get an event by its ID
export const getEventById = async (req, res) => {
    try {
        let { id } = req.params;
        let event = await Event.findById(id).populate('id_hotel');
        if (!event) {
            return res.status(404).send({ message: 'Event not found.' });
        }
        return res.send({ message: 'This is the event', event });
    } catch (err) {
        console.error('Error getting the event by its ID:', err);
        return res.status(500).send({ message: 'An error occurred while getting the event by its ID.' });
    }
}

// Function to update an event
export const updateEvent = async (req, res) => {
    try {
        let data = req.body;
        let { id } = req.params;
        let update = checkUpdate(data, false);
        if (!update) {
            return res.status(400).send({ message: 'Could not update the event.' });
        }
        let updatedEvent = await Event.findByIdAndUpdate({ _id: id }, data, { new: true }).populate('id_hotel');
        if (!updatedEvent) {
            return res.status(404).send({ message: 'Event not found.' });
        }
        return res.send({ message: 'Event updated successfully.', event: updatedEvent });
    } catch (err) {
        console.error('Error updating the event:', err);
        return res.status(500).send({ message: 'An error occurred while updating the event.', err });
    }
}

// Function to delete an event by its ID
export const deleteEvent = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedEvent = await Event.findByIdAndDelete({ _id: id });
        if (!deletedEvent) {
            return res.status(404).send({ message: 'Event not found.' });
        }
        return res.send({ message: 'Event deleted successfully.', event: deletedEvent });
    } catch (err) {
        console.error('Error deleting the event:', err);
        return res.status(500).send({ message: 'An error occurred while deleting the event.' });
    }
}