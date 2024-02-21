import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/movieModels.js";
import FavMovie from "../models/favModels.js";


const favMovie = asyncHandler(async (req, res) => {

    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
        return res.status(400).json({ message: "Movie does not exist" });
    }

    let userFav = await FavMovie.findOne({ userId: req.user.id });

    if (!userFav) {
        userFav = new FavMovie({ userId: req.user.id, favMovie: [] });
    }

    const movieIndex = userFav.favMovie.findIndex(id => id === movieId);

    if (movieIndex === -1) {
        userFav.favMovie.push(movieId);
    } else {
        userFav.favMovie.splice(movieIndex, 1);
    }

    await userFav.save();

    res.status(200).json({ message: "Favorite updated successfully", favorites: userFav.favMovie })



})

const getFav = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const favMovie = await FavMovie.findOne({ userId });

    if (!favMovie) {
        return res.status(404).json({ message: "No favorite movies found for the user" });
    }

    res.status(200).json(favMovie);
})

export { favMovie, getFav }