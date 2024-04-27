import express from 'express';
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js';
import { deleteRoom, getAllRooms, getRoomById, registerRoom, updateRoom } from './room.controller.js';

const api = express.Router();

api.post('/registerRoom', [validateJwt], [isAdmin], registerRoom);
api.get('/getAllRooms', [validateJwt], getAllRooms);
api.get('/getRoomById/:id', [validateJwt], getRoomById);
api.put('/updateRoom/:id', [validateJwt], [isAdmin], updateRoom);
api.delete('/deleteRoom/:id', [validateJwt], [isAdmin], deleteRoom);

export default api;