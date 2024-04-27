import mongoose from "mongoose"

// Esquema de Mongoose para la entidad Evento
const eventoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        uppercase: true,
        enum: ['PENDIENTE', 'CONFIRMADO', 'CANCELADO'],
        default: 'PENDIENTE',
        required: true
    },
    servicios: [{
        type: String,
        required: true
    }],
    id_hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('evento', eventoSchema)