import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const removeUser = createAsyncThunk('users/remove', async (user:any) => {
    await axios.delete(`http://localhost:3001/users/${user.id}`);
    //dev only
    await pause(1000);
    
    return user;
});

//dev only
const pause = (duration: any) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, duration);
    })
}