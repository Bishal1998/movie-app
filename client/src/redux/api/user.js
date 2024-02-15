import apiSlice from "./apiSlice";
import { USER_API_URL } from "../constants";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginApi: builder.mutation({
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
        }),
        update: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_API_URL}/${id}`,
                method: 'PUT',
                body: data,
            })
        }),
        logoutApi: builder.mutation({
            query: () => ({
                url: `${USER_API_URL}/logout`,
                method: 'POST',
            })
        })
    })
})

export default userApiSlice
export const { useLoginApiMutation, useRegisterMutation, useUpdateMutation, useLogoutApiMutation } = userApiSlice