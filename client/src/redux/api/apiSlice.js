import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL, USER_API_URL } from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const apiSlice = createApi({
    baseQuery,

    endpoints: () => ({})
})

export default apiSlice;