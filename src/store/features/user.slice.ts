import { userState } from "@/types/userTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: userState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      url: "https://linked-posts.routemisr.com/users/signin",
      method: "POST",
      data: values,
    };

    const { data } = await axios.request(options);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
        toast.success("Login Successfully");
      })
      .addCase(login.rejected, () => {
        toast.error("Incorrect Email or Password");
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
