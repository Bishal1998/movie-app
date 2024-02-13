import apiSlice from "./apiSlice";
import { USER_API_URL } from "../constants";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_API_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USER_API_URL,
                method: 'POST',
                body: data
            })
        })
    })
})

export default userApiSlice
export const { useLoginMutation, useRegisterMutation } = userApiSlice