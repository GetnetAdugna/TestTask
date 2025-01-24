import React, { useState } from "react";
import { Comment, User } from "../types";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Link,
  Image,
  Tag,
  AlternateEmail,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

/**
 * CreateComment Component
 *
 * Provides a form interface for creating new comments or replies.
 * Includes rich text formatting options and submission handling.
 *
 * @component
 * @param {CreateCommentProps} props - Component props
 * @param {Function} props.onAddComment - Callback function when comment is submitted
 * @param {string | null} props.parentId - ID of parent comment if this is a reply
 */

const CommentInput = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#536471",
  },
});

const ToolbarButton = styled(IconButton)({
  padding: "6px",
  color: "#536471",
  "&:hover": {
    backgroundColor: "rgba(29, 155, 240, 0.1)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#f85606",
  borderRadius: "20px",
  textTransform: "none",
  padding: "6px 16px",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#e04f05",
  },
  "&.Mui-disabled": {
    backgroundColor: "#ffd4c2",
    color: "#fff",
  },
});

interface CreateCommentProps {
  onAddComment: (comment: Comment) => void;
  parentId: string | null;
}

const CreateComment: React.FC<CreateCommentProps> = ({
  onAddComment,
  parentId,
}) => {
  const [content, setContent] = useState("");

  /**
   * Handles the submission of a new comment
   * Creates a comment object with the current user's information
   * and calls the onAddComment callback
   */
  const handleSubmit = () => {
    if (!content.trim()) return;

    const currentUser: User = {
      id: "1",
      name: "Getnet ",
      username: "Getnet",
      avatar:
        "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
    };

    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      createdAt: new Date(),
      parentId,
      replies: [],
      likes: 0,
    };

    onAddComment(newComment);
    setContent("");
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <CommentInput
          fullWidth
          multiline
          placeholder="Add comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={2}
        />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Stack direction="row">
            {[
              FormatBold,
              FormatItalic,
              FormatUnderlined,
              Link,
              Image,
              Tag,
              AlternateEmail,
            ].map((Icon, index) => (
              <ToolbarButton key={index} size="small">
                <Icon />
              </ToolbarButton>
            ))}
          </Stack>
          <Box sx={{ flex: 1 }} />
          <SubmitButton
            variant="contained"
            disabled={!content.trim()}
            onClick={handleSubmit}
          >
            Submit
          </SubmitButton>
        </Stack>
      </Box>
    </>
  );
};

export default CreateComment;
