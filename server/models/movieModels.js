import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,

    },
    thumbnailUrl: {
        type: String,
        required: true,
        trim: true,

    },
    genre: {
        type: String,
        required: true,

    },
    duration: {
        type: String,
        required: true,

    },
    isFavorite: {
        type: Boolean,
        default: false,

    },
    userId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;