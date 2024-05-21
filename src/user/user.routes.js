import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { deleteProfile, login, register, updateProfile } from './user.controller.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.put('/updateProfile/:id', [validateJwt], [isAdmin], updateProfile)
api.delete('/deleteProfile/:id', [validateJwt], [isAdmin], deleteProfile)

export default api