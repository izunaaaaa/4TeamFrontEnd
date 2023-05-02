export interface User {
  pk: number;
  is_coach: boolean;
}

export interface Group {
  group: {
    pk: number;
    name: string;
    members_count: string;
  };
  //test
}

export interface Category {
  id: number;
  group: Group;
  name: string;
}
export interface CommentType {
  id: number;
  user: {
    pk: number;
    is_coach: boolean;
  };
  anonymous_number: string;
  description: string;
  created_at: string;
  commentlikeCount: number;
  is_writer: boolean;
  feed_writer: boolean;
  is_like: boolean;
  recomment: RecommentType[];
}

export interface Description {
  description: string;
}

export interface RecommentType {
  user: {
    pk: number;
    is_coach: boolean;
  };
  pk: number;
  is_writer: boolean;
  is_like: boolean;
  feed_writer: boolean;
  description: string;
  created_at: string;
}

export interface DefaultFeedData {
  id: any;
  pk?: number;
  user: User;
  title: string;
  group: Group;
  category: number;
  description: string;
  visited: number;
  created_at: string;
  updated_at: string;
  like_count: number;
  comments_count: number;
  highest_like_comments: [Comment];
  is_like: boolean;
  comment: [Comment];
  thumbnail?: string;
  images?: string;
}
