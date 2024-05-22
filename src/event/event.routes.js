import express from 'express'

import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { deleteEvent, getAllEvents, getEventById, registerEvent, updateEvent } from './event.controller.js'
import { uploadImage } from '../middlewares/img-storage.js'

const api = express.Router()

api.post('/registerEvent', [validateJwt], [isAdmin], uploadImage.single('image'), registerEvent)
api.get('/getAllEvents', [validateJwt], getAllEvents)
api.get('/getEventById/:id', [validateJwt], getEventById)
api.put('/updateEvent/:id', [validateJwt], [isAdmin], uploadImage.single('image'), updateEvent)
api.delete('/deleteEvent/:id', [validateJwt], [isAdmin], deleteEvent)

export default api