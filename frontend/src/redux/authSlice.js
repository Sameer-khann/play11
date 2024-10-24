// src/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        isAuthenticated: false, // To track login status
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            console.log(" user : ", action.payload)
            state.user = action.payload;
            state.isAuthenticated = true; // Set user as authenticated
            console.log("This is user : ", state.user)
            console.log("Authentication Status : ", state.isAuthenticated)
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false; // Clear authentication status
        },
    },
});

// Export actions
export const { setLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
