import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  width: "340px",
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  marginBottom: "24px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "none",
  },
}));

const CoverImage = styled("div")({
  height: 120,
  width: "100%",
  backgroundImage: "linear-gradient(to right, #2196F3, #21CBF3)",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "4px solid #fff",
  margin: "-60px auto 0",
}));

interface ProfileCardProps {
  onCreatePost: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onCreatePost }) => {
  const currentUser = {
    name: "Getnet Asrat Desalgn",
    username: "@Get.me",
    avatar:
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
    stats: {
      likes: "2000",
      comments: "10",
      photos: "10",
    },
  };

  return (
    <StyledCard>
      <CoverImage />
      <CardContent sx={{ textAlign: "center" }}>
        <ProfileAvatar src={currentUser.avatar} alt={currentUser.name} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          {currentUser.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {currentUser.username}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-around", my: 3 }}>
          <Box>
            <Typography variant="h6">{currentUser.stats.likes}</Typography>
            <Typography color="text.secondary" variant="body2">
              likes
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser.stats.comments}</Typography>
            <Typography color="text.secondary" variant="body2">
              comments
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser.stats.photos}</Typography>
            <Typography color="text.secondary" variant="body2">
              photos
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={onCreatePost}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            py: 1,
          }}
        >
          Create Post
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProfileCard;
