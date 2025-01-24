import React, { useState } from "react";
import { Comment as CommentType } from "../types";
import CreateComment from "./CreateComment.tsx";
import { Box, Avatar, Typography, IconButton, Stack } from "@mui/material";
import {
  MoreHoriz,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import styles from "./Comment.module.scss";

/**
 * Comment Component
 *
 * Renders a comment with nested replies,
 * and the ability to add new replies. Supports infinite nesting of replies.
 *
 * @component
 * @param {CommentProps} props - Component props
 * @param {CommentType} props.comment - Comment data including author and replies
 * @param {Function} props.onAddReply - Callback function to handle new replies
 */

interface CommentProps {
  comment: CommentType;
  onAddReply: (newReply: CommentType) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onAddReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 25);
  const [dislikes, setDislikes] = useState(3);

  const handleAddReply = (newReply: CommentType) => {
    onAddReply({
      ...newReply,
      parentId: comment.id,
      replies: [],
    });
    setShowReplyForm(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentContainer}>
        <Avatar src={comment.author.avatar} sx={{ width: 40, height: 40 }} />
        <div className={styles.commentContent}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ fontWeight: 600 }}>
                {comment.author.name}
              </Typography>
              <Typography color="text.secondary" fontSize="14px">
                {comment.timeAgo || "58 minutes ago"}
              </Typography>
            </Stack>
            <IconButton size="small">
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>

          <Typography sx={{ mt: 0.5, mb: 1, fontSize: "15px" }}>
            {comment.content}
          </Typography>

          <div className={styles.statsContainer}>
            <IconButton className={styles.actionButton}>
              <ThumbUpOutlined />
            </IconButton>
            <span className={styles.statNumber}>{likes}</span>

            <IconButton className={styles.actionButton}>
              <ThumbDownOutlined />
            </IconButton>
            <span className={styles.statNumber}>{dislikes}</span>

            <button
              className={styles.replyButton}
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className={styles.replyFormContainer}>
          <CreateComment onAddComment={handleAddReply} parentId={comment.id} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onAddReply={onAddReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
