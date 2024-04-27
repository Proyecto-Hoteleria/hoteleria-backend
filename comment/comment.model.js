import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }
}, {
    versionKey: false
})

export default mongoose.model('comment', commentSchema)