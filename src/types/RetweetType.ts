import type { TweetType } from "./TweetType";
import type { UserType } from "./UserType";

export interface RetweetType {
    id: number;
    userId: number;
    postId: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: UserType;
    post: TweetType;
  }