import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  borderRadius: "12px",
  width: "340px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  marginBottom: "24px",
});

const StyledListItem = styled(ListItem)({
  padding: "12px 0",
  display: "flex",
  gap: "12px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: "8px",
  },
});

const TrendingImage = styled("img")({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  objectFit: "cover",
});

const TrendingCard = () => {
  const trendingTopics = [
    {
      topic: "Technology",
      posts: "1k posts",
      image:
        "https://cdn.pixabay.com/photo/2017/05/09/13/33/laptop-2298286_1280.png",
    },
    {
      topic: "Science",
      posts: "1k posts",
      image:
        "https://cdn.pixabay.com/photo/2016/09/16/19/12/atom-1674878_1280.png",
    },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Trending
        </Typography>
        <List>
          {trendingTopics.map((item, index) => (
            <StyledListItem key={index} sx={{ px: 0 }}>
              <TrendingImage src={item.image} alt={item.topic} />
              <ListItemText
                primary={item.topic}
                secondary={item.posts}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </StyledListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default TrendingCard;
