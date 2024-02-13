import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));

            const expiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('expires', expiry);
        },
        logOut: (state) => {
            state.userData = null;
            localStorage.clear();
        }

    }
})

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;