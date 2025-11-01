import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
const initialState: postsState = {
  posts: null,
  postDetails: null,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.userReducer.token;

    const options = {
      url: "https://linked-posts.routemisr.com/posts?limit=50",
      method: "GET",
      headers: { token },
    };

    const { data } = await axios.request(options);
    return data.posts;
  }
);

export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.userReducer.token;

    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: { token },
    };

    const { data } = await axios.request(options);
    return data.post;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, () => {
        console.log("rejected");
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(getPostDetails.rejected, () => {
        console.log("rejected");
      });
  },
});

export const postReducer = postSlice.reducer;
