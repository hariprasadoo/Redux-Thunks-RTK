import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resolve } from "path";

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3001/users');
    //dev only
    await pause(1000);
    
    return response.data;
});

//dev only
const pause = (duration: any) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, duration);
    })
}