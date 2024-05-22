import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { uploadImage } from '../middlewares/img-storage.js'
import { deleteHotel, getAllHotels, getHotelByName, registerHotel, updateHotel } from './hotel.controller.js'

const api = express.Router()

api.post('/registerHotel', [validateJwt], [isAdmin], uploadImage.single('image'), registerHotel)
api.get('/getAllHotels', [validateJwt], getAllHotels)
api.post('/getHotelByName', [validateJwt], getHotelByName)
api.put('/updateHotel/:id', [validateJwt], [isAdmin], uploadImage.single('image'), updateHotel)
api.delete('/deleteHotel/:id', [validateJwt], [isAdmin], deleteHotel)

export default api