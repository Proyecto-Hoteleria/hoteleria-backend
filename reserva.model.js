import mongoose from 'mongoose';

const reservaSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: [true, 'El id del usuario es obligatorio']
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habitacion',
        required: [true, 'El id de la habitacion']
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: [true, 'El id del hotel es obligatorio']
    },
    fecha_entrada: {
        type: Date,
        required: [true, 'La fecha de entrada es obligatoria']
    },
    fecha_salida: {
        type: Date,
        required: [true, 'La fecha de salida es obligatoria']
    },
    estado: {
        type: String,
        uppercase: true,
        enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
        default: 'PENDIENTE'
    }
}, {
    versionKey: false
});

export default mongoose.model('reserva', reservaSchema);