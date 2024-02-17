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
    const { id } = req.params;

    const movieExists = await Movie.findById(id);

    if (!movieExists) {
        return res.status(400).json({ message: "Movie does not exist" });
    }

    const { title, description, videoUrl, thumbnailUrl, genre, duration } = req.body;

    try {
        movieExists.title = title || movieExists.title,
            movieExists.description = description || movieExists.description,
            movieExists.videoUrl = videoUrl || movieExists.videoUrl,
            movieExists.thumbnailUrl = thumbnailUrl || movieExists.thumbnailUrl,
            movieExists.genre = genre || movieExists.genre,
            movieExists.duration = duration || movieExists.duration

        const updatedMovie = await movieExists.save();
        res.status(200).json(updatedMovie);
    } catch (error) {
        throw new Error("Could not update the movie")
    }

})

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movieExists = await Movie.findById(id);

    if (!movieExists) {
        return res.status(400).json({ message: "Movie does not exist" });
    }

    try {
        await Movie.findByIdAndDelete(id);
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        throw new Error("Couldn't delete the movie")
    }

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