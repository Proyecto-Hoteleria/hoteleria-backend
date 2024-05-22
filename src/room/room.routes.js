import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { uploadImage } from '../middlewares/img-storage.js'
import { deleteRoom, getAllRooms, getRoomById, registerRoom, updateRoom } from './room.controller.js'

const api = express.Router()

api.post('/registerRoom', [validateJwt], [isAdmin], uploadImage.single('image'), registerRoom)
api.get('/getAllRooms', [validateJwt], getAllRooms)
api.get('/getRoomById/:id', [validateJwt], getRoomById)
api.put('/updateRoom/:id', [validateJwt], [isAdmin], uploadImage.single('image'),updateRoom)
api.delete('/deleteRoom/:id', [validateJwt], [isAdmin], deleteRoom)

export default api