import type { FollowerType } from "./FollowerType";
import type { FollowingType } from "./FollowingType";
import type { RetweetType } from "./RetweetType";
import type { TweetType } from "./TweetType";

export interface FollowingDataType {
    id: number;
    created_at: string;
    updated_at: string;
    followingId: number;
    followerId: number;
    follower: FollowerType[];
    following: FollowingType[];
    retweets: RetweetType[];
    posts: TweetType[]
}