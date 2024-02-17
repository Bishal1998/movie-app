import asyncHandler from "../middleware/asyncHandler.js";

const createMovie = asyncHandler(async (req, res) => {
    console.log("Create Movie")
})

const getAllMovie = asyncHandler(async (req, res) => {
    console.log("Get All Movies")
})

const updateMovie = asyncHandler(async (req, res) => {
    console.log("Update Movie")
})

const deleteMovie = asyncHandler(async (req, res) => {
    console.log("Delete Movie")
})

const getSingleMovie = asyncHandler(async (req, res) => {
    console.log("Get Single Movie")
})

export { createMovie, getAllMovie, updateMovie, deleteMovie, getSingleMovie }