import React, { useState, useRef } from "react";
import {
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import {
  Close,
  Image as ImageIcon,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Link,
  Tag,
  AlternateEmail,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Post, User } from "../types";

interface CreatePostProps {
  onCreatePost: (post: Post) => void;
  onClose: () => void;
  open: boolean;
}

const PostInput = styled(TextField)({
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

const PostButton = styled(Button)({
  backgroundColor: "#f85606",
  borderRadius: "20px",
  textTransform: "none",
  padding: "6px 16px",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#0000FF",
  },
  "&.Mui-disabled": {
    backgroundColor: "#0000FF",
    color: "#fff",
  },
});

const CancelButton = styled(Button)({
  color: "#536471",
  borderRadius: "20px",
  textTransform: "none",
  padding: "6px 16px",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

const ImageInput = styled("input")({
  display: "none",
});

const StyledCard = styled(Box)({
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

/**
 * CreatePost Component
 *
 * A modal component for creating new posts with rich text formatting options.
 * Supports text content and image uploads.
 *
 * @component
 * @param {CreatePostProps} props - Component props
 * @param {Function} props.onCreatePost - Callback function when post is created
 * @param {Function} props.onClose - Function to close the modal
 * @param {boolean} props.open - Controls modal visibility
 */

const CreatePost: React.FC<Omit<CreatePostProps, "open">> = ({
  onCreatePost,
  onClose,
}) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const currentUser: User = {
      id: "1",
      name: "Getnet Asrat",
      username:
        "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
      avatar: "",
    };

    const newPost: Post = {
      id: Date.now().toString(),
      content,
      images: images.length > 0 ? images : undefined,
      author: currentUser,
      createdAt: new Date(),
      comments: [],
      likes: 0,
      isLiked: false,
      isBookmarked: false,
    };

    onCreatePost(newPost);
    setContent("");
    setImages([]);
    onClose();
  };

  return (
    <StyledCard>
      <Box sx={{ p: 2 }}>
        <PostInput
          fullWidth
          multiline
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={3}
        />
        {images.length > 0 && (
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            }}
          >
            {images.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <Close sx={{ fontSize: 16, color: "white" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Stack direction="row">
            {[
              FormatBold,
              FormatItalic,
              FormatUnderlined,
              Link,
              Tag,
              AlternateEmail,
            ].map((Icon, index) => (
              <ToolbarButton key={index} size="small">
                <Icon />
              </ToolbarButton>
            ))}
            <Box component="span" onClick={() => fileInputRef.current?.click()}>
              <ToolbarButton>
                <ImageIcon />
              </ToolbarButton>
              <ImageInput
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </Box>
          </Stack>
          <Box sx={{ flex: 1 }} />
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PostButton
            variant="contained"
            onClick={handleSubmit}
            disabled={!content.trim() && images.length === 0}
          >
            Post
          </PostButton>
        </Stack>
      </DialogActions>
    </StyledCard>
  );
};

export default CreatePost;
