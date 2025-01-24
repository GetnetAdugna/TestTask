export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
}

export interface Post {
  id: string;
  content: string;
  images?: string[];
  image?: string;
  author: User;
  createdAt: Date;
  comments: Comment[];
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  parentId: string | null;
  replies: Comment[];
  likes?: number;
  timeAgo?: string;
}
