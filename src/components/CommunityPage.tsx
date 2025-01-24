import React, { useState } from "react";
import { Post } from "../types";
import { mockPosts } from "../data/mockData.ts";
import PostList from "./PostList.tsx";
import CreatePost from "./CreatePost.tsx";
import Layout from "../layout/Layout.tsx";
import { Box } from "@mui/material";

/**
 * CommunityPage Component
 *
 * Main container component for the community feature.
 * Manages the state of posts and handles creation of new posts.
 *
 * @component
 * @uses {PostList} - Renders the list of posts
 * @uses {CreatePost} - Handles creation of new posts
 * @uses {Layout} - Provides the page layout structure
 */

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <Layout onCreatePost={() => setShowCreatePost(true)}>
      <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
        {showCreatePost && (
          <Box sx={{ mb: 2 }}>
            <CreatePost
              onCreatePost={handleCreatePost}
              onClose={() => setShowCreatePost(false)}
            />
          </Box>
        )}
        <PostList posts={posts} />
      </Box>
    </Layout>
  );
};

export default CommunityPage;
