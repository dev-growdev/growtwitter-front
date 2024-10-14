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

export interface LinkType {
  active: boolean;
  label: string;
  url: string
}

export interface PaginateTweetType {
  current_page: number;
  data: TweetType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PaginateRetweetType {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface RetweetType {
    content: string | null;
    created_at: string; 
    id: number;
    post: TweetType;
    postId: number;
    updated_at: string;
    user: UserType;
    userId: number;
}