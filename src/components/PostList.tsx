import React from "react";
import { Post as PostType } from "../types";
import Post from "./Post.tsx";
import styles from "./PostList.module.scss";

interface PostListProps {
  posts: PostType[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
