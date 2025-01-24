import React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  borderRadius: "12px",
  width: "340px",
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  marginBottom: "24px",
});

const StyledChip = styled(Chip)({
  borderRadius: "16px",
  backgroundColor: "#f5f5f5",
  padding: "4px 8px",
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
});

const TopicsCard = () => {
  const topics = ["#lomolca", "#analog", "#35mm", "#zenit", "#filmisoup"];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Topics you follow
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: 2 }}
        >
          {topics.map((topic) => (
            <StyledChip key={topic} label={topic} />
          ))}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default TopicsCard;
