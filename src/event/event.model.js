import mongoose from "mongoose"

// Esquema de Mongoose para la entidad Evento
const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    status: {
        type: String,
        uppercase: true,
        enum: ['PENDING', 'CONFIRMED', 'CANCELED'],
        default: 'PENDING',
        required: true
    },
    services: [{
        type: String,
        required: true
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('event', eventSchema)