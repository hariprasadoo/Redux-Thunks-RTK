import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';

export const addUser = createAsyncThunk('users/add', async () => {
  const response = await axios.post('http://localhost:3001/users', {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  });
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