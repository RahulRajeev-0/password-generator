
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const register = createAsyncThunk(
    'users/register/',
    async ({username, email, password }, thunkApi) => {
        const body = JSON.stringify({
            full_name,
            email,
            password
        })
        try {
            const res = await fetch(`${BASE_URL}/accounts/register/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();
            if (res.status === 201) {
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
)