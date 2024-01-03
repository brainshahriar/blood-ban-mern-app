import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//login
export const userLogin = createAsyncThunk(
  "/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/login", {
        role,
        email,
        password,
      });

      // Store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.replace('/');
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);
//register
export const userRegister = createAsyncThunk(
  "/register",
  async (
    {
      role,
      name,
      email,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
      password,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/register", {
        role,
        name,
        email,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
        password,
      });

      if (data.success) {
        alert(data.message);
        window.location.replace('/login');
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);
//current user
export const getCurrentUser = createAsyncThunk(
    '/getCurrentUser',
    async({rejectWithValue}) =>{
        try {
            const res = await axios.get('http://localhost:8000/api/current-user')
            if(res?.data){
                return res?.data;
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              } else {
                rejectWithValue(error.message);
              }
        }
    }
)

export default userLogin;
