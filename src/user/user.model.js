import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'The password must be 8 characters long.'],
        required: true
    },
    phone: {
        type: String,
        minLength: [8, 'The phone must be 8 characters long.'],
        maxLength: [8, 'The password must be less than 8 characters.'],
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model('user', userSchema)