"use client";
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import PostForm from "@/components/PostForm/PostForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPosts } from "@/store/features/post.slice";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

export default function Page() {
  const { posts } = useAppSelector((store) => store.postReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <Grid container sx={{ marginBottom: "20px" }}>
        <Grid size={2}></Grid>
        <Grid
          size={8}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <PostForm />
          {posts ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                postInfo={post}
                showAllComments={false}
              />
            ))
          ) : (
            <Loading />
          )}
        </Grid>
        <Grid size={2}></Grid>
      </Grid>
    </ProtectedRoute>
  );
}
