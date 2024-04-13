import { Schema, model } from 'mongoose'

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        minLength: [8, 'La contraseña supera los 8 caracteres'],
        required: true
    },
    telefono: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true
    },
    rol: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENTE'],
        required: true
    }
}, {
    versionKey: false
})

export default model('usuario', usuarioSchema)