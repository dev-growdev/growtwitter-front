import type { UserType } from './UserType';

export interface TweetType {
  id: number;
  created_at: string;
  content: string;
  user: UserType;
  likes_count: number;
  likes: [];
  comments_count: number;
  comments: Array<{
    id: number;
    user: {
      name: string;
      avatar_url?: string;
    };
    content: string;
  }>;
}
