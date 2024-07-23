import type { UserType } from './UserType';

export interface TweetType {
  id: string;
  created_at: string;
  content: string;
  user: UserType;
  likes: string;
}
