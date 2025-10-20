"use client";
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Tooltip, Divider, TextField, Button, } from "@mui/material";
import { Share as ShareIcon, MoreVert as MoreVertIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon, } from "@mui/icons-material";
import Image from "next/image";
import { Post } from "../../types/posts.types";
import CommentCard from "../CommentCard/CommentCard";
import Link from "next/link";

export default function PostCard({ postInfo, showAllComments = false, }: { postInfo: Post; showAllComments: boolean; }) {
  return (
    <Card sx={{ maxWidth: { xs: "100%", md: "70%" }, mx: "auto", width: "100%" }}>
      <CardHeader
        avatar={
          <Image src={postInfo.user.photo} width={50} height={50} style={{ borderRadius: "100%" }} alt={`${postInfo.user.name} Profile Image`} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo.user.name}
        subheader={new Date(postInfo.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {postInfo.body}
        </Typography>
      </CardContent>

      {postInfo.image && (
        <div style={{ position: "relative", width: "100%", height: "450px" }}>
          <Image src={postInfo.image} alt="post image" fill
            sizes="(max-width: 768px) 100vw,  (max-width: 1200px) 70vw, 800px" style={{ objectFit: "cover" }} />
        </div>
      )}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Tooltip title="like">
            <IconButton aria-label="like">
              <ThumbUpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="comment">
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Tooltip title="share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Divider sx={{ fontSize: "18px", mb: 1 }}>Comments</Divider>
      <div>
        {postInfo.comments.length > 0 && showAllComments === false && (
          <div>
            <CommentCard commentInfo={postInfo.comments[0]} />
            <Button fullWidth variant="contained">
              <Link href={`/post/${postInfo._id}`} style={{ textDecorationLine: "none", color: "white", width: "100%", }}>
                Show all comments
              </Link>
            </Button>
          </div>
        )}
        {postInfo.comments.length > 1 && showAllComments === true && postInfo.comments.map((comment) => (
          <CommentCard key={comment._id} commentInfo={comment} />
        ))}
      </div>
      <TextField multiline fullWidth maxRows={2} placeholder="Add your comment" sx={{ mt: 2 }}></TextField>
    </Card>
  );
}
