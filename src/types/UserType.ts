export interface UserType {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  following_count: number;
  followers_count: number;
  posts_count: number
  retweets_count: number
  followers: [] 
  followings: [] 
  posts: []
  retweets: []
}
