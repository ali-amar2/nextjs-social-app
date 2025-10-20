import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAppSelector } from "@/hooks/store.hooks";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function PostForm() {

    const { token } = useAppSelector((store) => store.userReducer)
    const postContentRef = useRef<HTMLInputElement>(null)
    const postFileRef = useRef<HTMLInputElement>(null)

    async function createPost() {
        const content = postContentRef.current?.value || ""
        const file = postFileRef.current?.files?.[0]
        const postData = new FormData()
        postData.append("body", content)
        if (file) postData.append("image", file)

        const options = {
            url: "https://linked-posts.routemisr.com/posts",
            method: "POST",
            headers: {
                token
            },
            data: postData
        }
        await toast.promise(axios.request(options),
            {
                loading: "Uploading...",
                success: (res) => {
                    if (res.data.message === "success") {
                        if (postContentRef.current) postContentRef.current.value = "";
                        if (postFileRef.current) postFileRef.current.value = "";
                        return "Your post has been uploaded ✅";
                    } else {
                        throw new Error("Unexpected response");
                    }
                },
                error: "Could not upload the post ❌",
            }
        );

    }
    return <>
        <Box sx={{ maxWidth: { xs: "100%", md: "70%" }, mx: "auto", width: "100%" }}>
            <TextField fullWidth multiline minRows={7} sx={{ mb: 1 }} placeholder="What's on your mind" required inputRef={postContentRef} />
            <Box sx={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}> Upload files
                    <VisuallyHiddenInput required type="file" ref={postFileRef} />
                </Button>
                <Button onClick={createPost} variant="contained" endIcon={<SendIcon />}>
                    Post
                </Button>
            </Box>
        </Box>
    </>
}
