import { FAV_API_URL } from '../constants';
import apiSlice from './apiSlice';

const favMovieSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        toggleFav: builder.mutation({
            query: (id) => ({
                url: `${FAV_API_URL}/${id}`,
                method: 'PUT',
            })
        }),
        getFavList: builder.query({
            query: (id) => ({
                url: `${FAV_API_URL}/${id}`,
                method: 'GET',
            })
        })
    })
})

export const { useToggleFavMutation, useGetFavListQuery } = favMovieSlice;