import type { UserType } from './UserType';

export interface TweetType {
  id: number;
  created_at: string;
  content: string;
  user: UserType;
  likes: string;
}
