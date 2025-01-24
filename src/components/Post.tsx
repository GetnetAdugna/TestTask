import React, { useState } from "react";
import { Post as PostType, Comment as CommentType } from "../types";
import CreateComment from "./CreateComment.tsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  ShareOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Comment from "./Comment.tsx";

/**
 * Post Component
 *
 * Renders a social media post with comments
 * Handles nested comments and replies recursively.
 *
 * @component
 * @param {PostProps} props - Component props
 * @param {PostType} props.post - Post data including author, content, and comments
 */

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.01)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: 0,
    padding: "0",
    borderRadius: 0,
    border: "none",
    borderBottom: "1px solid #eee",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: "0 16px",
  "&:last-child": {
    paddingBottom: "16px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0 8px",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
  },
}));

const ImageGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2px",
  marginTop: "12px",
  borderRadius: "16px",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    borderRadius: "8px",
    maxHeight: "300px",
    width: "100%",
    margin: "12px 0",
  },
}));

const ActionButton = styled(IconButton)({
  color: "#536471",
  padding: "6px",
  "&:hover": {
    backgroundColor: "rgba(29, 155, 240, 0.1)",
    color: "#1d9bf0",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
});

const CommentSection = styled(Box)(({ theme }) => ({
  padding: "16px",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [comments, setComments] = useState<CommentType[]>(
    post.comments.map((comment) => ({
      ...comment,
      replies: comment.replies || [],
      parentId: comment.parentId || null,
    }))
  );
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  /**
   * Handles adding a new comment or reply
   * @param {CommentType} newComment - The new comment to be added
   */
  const handleAddComment = (newComment: CommentType) => {
    if (newComment.parentId) {
      setComments((prevComments) => {
        const addReplyRecursively = (
          comments: CommentType[]
        ): CommentType[] => {
          return comments.map((comment) => {
            if (comment.id === newComment.parentId) {
              return {
                ...comment,
                replies: [
                  ...(comment.replies || []),
                  { ...newComment, replies: [] },
                ],
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReplyRecursively(comment.replies),
              };
            }
            return comment;
          });
        };

        return addReplyRecursively(prevComments);
      });
    } else {
      setComments((prevComments) => [
        ...prevComments,
        { ...newComment, replies: [] },
      ]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  /**
   * Renders a grid of post images with responsive layout
   * @returns {JSX.Element | null} Image grid or null if no images
   */
  const renderImages = () => {
    if (!post.image && !post.images?.length) return null;

    const imageArray = post.images || (post.image ? [post.image] : []);

    return (
      <ImageGrid
        sx={{
          gridTemplateColumns: imageArray.length > 1 ? "1fr 1fr" : "1fr",
          maxHeight: imageArray.length > 2 ? "500px" : "400px",
        }}
      >
        {imageArray.map((image, index) => (
          <img key={index} src={image} alt={`Post image ${index + 1}`} />
        ))}
      </ImageGrid>
    );
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar src={post.author.avatar} sx={{ width: 48, height: 48 }} />
        }
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {post.author.name}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "15px" }}>
              @{post.author.name.toLowerCase().replace(" ", "")} ·{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Box>
        }
      />
      <StyledCardContent>
        <Typography variant="body1" sx={{ fontSize: "15px", lineHeight: 1.5 }}>
          {post.content}
        </Typography>
        {renderImages()}
      </StyledCardContent>
      <CardActions sx={{ px: 2, pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ActionButton onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </ActionButton>
          <Typography color="text.secondary">{post.likes || 0}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ActionButton onClick={toggleComments}>
            <ChatBubbleOutline />
          </ActionButton>
          <Typography color="text.secondary">{comments.length}</Typography>
        </Box>
        <ActionButton sx={{ ml: "auto" }}>
          <ShareOutlined />
        </ActionButton>
      </CardActions>

      {showComments && (
        <>
          <Divider />
          <Box
            sx={{
              p: 2,
            }}
          >
            <CreateComment onAddComment={handleAddComment} parentId={null} />
          </Box>
          <CommentSection>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onAddReply={handleAddComment}
              />
            ))}
          </CommentSection>
        </>
      )}
    </StyledCard>
  );
};

export default Post;
