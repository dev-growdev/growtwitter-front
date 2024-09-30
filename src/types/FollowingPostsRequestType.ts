import type { FollowerDataType } from "./FollowerDataType";
import type { FollowingDataType } from "./FollowingDataType";

export interface FollowingPostsRequestType{
    followings: number,
    followers: number,
    followingsData: FollowingDataType[],
    followersData: FollowerDataType[]
}