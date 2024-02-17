import apiSlice from "./apiSlice";
import { MOVIE_API_URL } from "../constants";

const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMovie: builder.mutation({
            query: (data) => ({
                url: `${MOVIE_API_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllMovies: builder.query({
            query: () => ({
                url: `${MOVIE_API_URL}`,
            })
        }),
        getSingleMovie: builder.query({
            query: (id) => ({
                url: `${MOVIE_API_URL}/${id}`,
            })
        }),
        updateMovie: builder.mutation({
            query: ({ id, data }) => ({
                url: `${MOVIE_API_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `${MOVIE_API_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { useCreateMovieMutation, useGetAllMoviesQuery, useGetSingleMovieQuery, useUpdateMovieMutation, useDeleteMovieMutation } = movieApiSlice;