import mongoose from "mongoose"

// Esquema de Mongoose para la entidad Room
const roomSchema = mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        uppercase: true,
        enum: ['DISPONIBLE', 'OCUPADA', 'MANTENIMIENTO'],
        default: 'DISPONIBLE',
        required: true
    },
    id_hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('room', roomSchema)