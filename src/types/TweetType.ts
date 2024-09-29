import type { UserType } from './UserType';

export interface TweetType {
  id: number;
  created_at: string;
  content: string;
  user: UserType;
  likes_count: number;
  likes: [];
  comments_count: number;
  comments: CommentType[];
}
export interface CommentType {
  id: number;
  user: UserType;
  content: string;
  created_at: string;
}