import { Comment } from "@/types/posts.types";
import { Box, CardHeader, Typography } from "@mui/material";
import Image from "next/image";
import userImage from "../../assets/imgs/user.png";

export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
    function handleImagePath(path: string) {
        if (path.includes("undefined")) {
            return userImage;
        } else return path;
    }
    return <>
        <Box sx={{ backgroundColor: "#f1f1f1", mb: 1, p: 2 }}>
            <CardHeader
                avatar={
                    <Image src={handleImagePath(commentInfo.commentCreator.photo)} width={50} height={50} alt={`${commentInfo.commentCreator.name} Profile Image`} />}
                title={commentInfo.commentCreator.name}
                subheader={new Date(commentInfo.createdAt).toLocaleDateString()}
            />
            <Typography sx={{ pl: 3 }} component={"p"}>
                {commentInfo.content}
            </Typography>
        </Box>
    </>

}
