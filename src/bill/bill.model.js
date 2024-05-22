import mongoose from 'mongoose'

const billSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reserves: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reserve',
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
})

const Bill = mongoose.model('bill', billSchema)

export default Bill