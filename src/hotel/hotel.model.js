import mongoose from "mongoose"

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    category: {
        type: String,
        uppercase: true,
        enum: ['SIN CALIFICACIÓN', '1 ESTRELLA', '2 ESTRELLAS', '3 ESTRELLAS', '4 ESTRELLAS', '5 ESTRELLAS'],
        default: 'SIN CALIFICACIÓN',
        required: true
    },
    amenities: [{
        type: String,
        required: true
    }]
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('hotel', hotelSchema)