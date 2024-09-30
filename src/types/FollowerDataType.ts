import type { FollowerType } from "./FollowerType";
import type { FollowingType } from "./FollowingType";
import type { TweetType } from "./TweetType";

export interface FollowerDataType {
    id: number;
    created_at: string;
    updated_at: string;
    followingId: number;
    followerId: number;
    follower: FollowerType[];
    following: FollowingType[];
    posts: TweetType[]
}