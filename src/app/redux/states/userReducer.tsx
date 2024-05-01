'use client';

import { createSlice } from "@reduxjs/toolkit";
import jwt from 'jsonwebtoken';
export interface UserState {
    userid: string;
    email: string;
    role: string;
    loggedIn: boolean;
    access_token: string;
    refresh_token: string;
}

const initialState: UserState = {
    userid: "",
    email: "",
    role: "",
    loggedIn: false,
    access_token: "",
    refresh_token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            // decode the access token and place info here
            const { access_token, refresh_token } = action.payload;
            const decoded = jwt.decode(access_token) as {
                userid: string;
                email: string;
                role: string;
            };
            // Update the state with user data and tokens
            state.userid = decoded?.userid;
            state.email = decoded.email;
            state.role = decoded.role;
            state.loggedIn = true;
            state.access_token = access_token;
            state.refresh_token = refresh_token;
        },
        logoutUser: (state) => {
            state = initialState;
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;