import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/movieModels.js";

const createMovie = asyncHandler(async (req, res) => {

    const { title, description, videoUrl, thumbnailUrl, genre, duration } = req.body;

    if (!title || !description || !videoUrl || !thumbnailUrl || !genre || !duration) {
        throw new Error("All Fields are required.");
    }

    const slug = title.split(" ").join("-").toLowerCase();

    const newMovie = new Movie({ title, description, videoUrl, thumbnailUrl, genre, duration, slug, userId: req.user._id })
    try {
        await newMovie.save();
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(400);
        throw new Error("Invalid Movie Data");
    }
})

const getAllMovie = asyncHandler(async (req, res) => {

    const movies = await Movie.find({});
    res.status(200).json(movies)
})

const updateMovie = asyncHandler(async (req, res) => {
    console.log("Update Movie")
})

const deleteMovie = asyncHandler(async (req, res) => {
    console.log("Delete Movie")
})

const getSingleMovie = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const movieExists = await Movie.findById(id);

    if (!movieExists) {
        return res.status(400).json({ message: "Movie does not exist" });
    }

    res.status(200).json(movieExists)

})

export { createMovie, getAllMovie, updateMovie, deleteMovie, getSingleMovie }