import mongoose from 'mongoose';

const favSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    favMovie: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const FavMovie = mongoose.model("FavMovie", favSchema);

export default FavMovie;