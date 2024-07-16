import type { UserType } from './UserType';

export interface TweetType {
  id: string;
  content: string;
  user: UserType;
}
