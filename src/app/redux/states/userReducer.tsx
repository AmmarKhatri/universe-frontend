'use client';

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from 'jsonwebtoken';
export interface UserState {
    userid: string;
    email: string;
    username: string;
    role: string;
    loggedIn: boolean;
    access_token: string;
    refresh_token: string;
}
const initialState: UserState = {
    userid: "",
    username: "",
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
            const { access_token, refresh_token, user } = action.payload;
            const decoded = jwt.decode(access_token) as {
                id: string;
                email: string;
                role: string;
            };
            // Update the state with user data and tokens
            state.userid = decoded.id;
            state.email = decoded.email;
            state.role = decoded.role;
            state.loggedIn = true;
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.username = user.username;
        },
        logoutUser: (state) => {
            state.userid = "";
            state.email = "";
            state.role = "";
            state.loggedIn = false;
            state.access_token = "";
            state.refresh_token = "";
            state.username = "";
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;