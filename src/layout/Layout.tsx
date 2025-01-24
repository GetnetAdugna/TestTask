import React, { useState } from "react";
import {
  Box,
  List,
  ListItemText,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Layout.scss";
import ProfileCard from "../components/ProfileCard.tsx";
import TrendingCard from "../components/TrendingCard.tsx";
import Navbar from "../components/Navbar.tsx";
import DrawerContent from "../components/DrawerContent.tsx";

/**
 * Layout Component
 *
 * Main layout wrapper for the application.
 * Provides consistent structure with navigation, sidebar, and content area.
 * Handles responsive behavior for different screen sizes.
 *
 * @component
 * @param {LayoutProps} props - Component props
 * @param {ReactNode} props.children - Content to be rendered within the layout
 * @param {Function} props.onCreatePost - Callback for creating new posts
 */

interface LayoutProps {
  children: React.ReactNode;
  onCreatePost: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCreatePost }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <Navbar onMenuClick={handleDrawerToggle} isMobile={isMobile} />

      <div className="main-container">
        <div className="side-content">
          <div className="sidebar">
            <div className="card"></div>

            <div className="card">
              <Typography className="section-title">RECENT</Typography>
              <List sx={{ p: 0 }}>
                {[
                  {
                    title: "Recent one !",
                    image:
                      "https://media.istockphoto.com/id/944566544/vector/detailed-map-of-new-york-state.jpg?s=612x612&w=is&k=20&c=zE6PrvpvMEi4ACsiMNXVF29hhdI6PabCUFAXEk7rIJc=",
                  },
                  {
                    title: "updated infor for Recent 2",
                    image:
                      "https://media.istockphoto.com/id/2027620011/vector/statue-of-liberty.jpg?s=612x612&w=is&k=20&c=WU0qfoeHK1QPD5waplewlNJpeisoznGLU-Va6a3hqAA=",
                  },
                  {
                    title: "Recent Three",
                    image:
                      "https://cdn.pixabay.com/photo/2020/03/18/06/00/newyork-4942781_1280.png",
                  },
                ].map((item) => (
                  <div className="sidebar-list-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="sidebar-image"
                    />
                    <ListItemText
                      primary={item.title}
                      sx={{ fontSize: "14px" }}
                    />
                  </div>
                ))}
              </List>
            </div>
          </div>
        </div>

        {isMobile && <ProfileCard onCreatePost={onCreatePost} />}
        {children}

        <div className="side-content">
          <ProfileCard onCreatePost={onCreatePost} />
          <TrendingCard />
        </div>
      </div>

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerContent />
        </Drawer>
      )}
    </Box>
  );
};

export default Layout;
