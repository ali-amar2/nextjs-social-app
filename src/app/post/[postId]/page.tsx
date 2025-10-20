"use client";
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPostDetails } from "@/store/features/post.slice";
import { Box } from "@mui/material";
import { use, useEffect } from "react";

export default function page({ params }: { params: Promise<{ postId: string }>; }) {
    const { postId } = use(params);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPostDetails(postId));
    }, []);
    let { postDetails } = useAppSelector((store) => store.postReducer);
    return (
        <>
            <Box sx={{ mb: 2 }}>
                {postDetails ? (<PostCard postInfo={postDetails} showAllComments={true} />) : (<Loading />)}
            </Box>
        </>
    );
}
