import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { Mail, NotificationsNone } from "@mui/icons-material";

const DrawerContent = () => {
  const navItems = ["FEED", "EVENTS", "ABOUT"];
  const currentUser = {
    avatar:
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
  };

  return (
    <Box className="mobile-menu">
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            className={`mobile-menu-item ${item === "FEED" ? "active" : ""}`}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box className="mobile-action-icons">
        <IconButton>
          <Mail sx={{ color: "#666" }} />
        </IconButton>
        <IconButton>
          <NotificationsNone sx={{ color: "#666" }} />
        </IconButton>
        <IconButton>
          <Box
            component="img"
            src={currentUser.avatar}
            className="mobile-menu-avatar"
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DrawerContent;
