import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User ID is required']
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: [true, 'Room ID is required']
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: [true, 'Hotel ID is required']
    },
    checkInDate: {
        type: Date,
        required: [true, 'Check-in date is required']
    },
    checkOutDate: {
        type: Date,
        required: [true, 'Check-out date is required']
    },
    status: {
        type: String,
        uppercase: true,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'PENDING'
    }
}, {
    versionKey: false
});

export default mongoose.model('reservation', reservationSchema);
