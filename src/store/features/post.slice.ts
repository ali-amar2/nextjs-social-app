import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: postsState = {
  posts: null,
  postDetails: null,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.token;

    const options = {
      url: "https://linked-posts.routemisr.com/posts?limit=50",
      method: "GET",
      headers: {
        token,
      },
    };

    let { data } = await axios.request(options);
    return data.posts;
  }
);
export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (id: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.token;
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: {
        token,
      },
    };

    let { data } = await axios.request(options);
    return data.post;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.postDetails = action.payload;
    });
    builder.addCase(getPostDetails.rejected, () => {
      console.log("rejected");
    });
  },
});

export const postReducer = postSlice.reducer;
