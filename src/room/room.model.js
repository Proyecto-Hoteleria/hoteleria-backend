import mongoose from "mongoose"

// Esquema de Mongoose para la entidad Room
const roomSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        uppercase: true,
        enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
        default: 'AVAILABLE',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('room', roomSchema)