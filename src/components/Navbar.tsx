import React from "react";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { Mail, NotificationsNone, Menu as MenuIcon } from "@mui/icons-material";

const NavContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 24px",
  borderBottom: "1px solid #eee",
  backgroundColor: "#fff",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  height: "64px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
});

const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const NavLinks = styled(Box)({
  display: "flex",
  gap: "8px",
});

const NavPill = styled(Box)({
  padding: "6px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const ActionIcons = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

interface NavbarProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isMobile }) => {
  // Get the currentUser data from ProfileCard
  const currentUser = {
    avatar:
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
  };

  return (
    <NavContainer>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Logo>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Test Community
          </Typography>
        </Logo>
      </Box>

      {!isMobile && (
        <>
          <NavLinks>
            {["FEED", "EVENTS", "ABOUT"].map((item) => (
              <NavPill
                key={item}
                sx={{
                  backgroundColor: item === "FEED" ? "#f0f0f0" : "transparent",
                }}
              >
                {item}
              </NavPill>
            ))}
          </NavLinks>

          <ActionIcons>
            <IconButton size="small">
              <Mail sx={{ color: "#666" }} />
            </IconButton>
            <IconButton size="small">
              <NotificationsNone sx={{ color: "#666" }} />
            </IconButton>
            <Box
              component="img"
              src={currentUser.avatar}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </ActionIcons>
        </>
      )}
    </NavContainer>
  );
};

export default Navbar;
