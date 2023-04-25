export interface User {
  pk: number;
  is_coach: boolean;
}
interface Comment {
  id: number;
  user: {
    usernmae: string;
    name: string;
    email: string;
    avatar: string;
    is_coach: boolean;
  };
  description: string;
  created_at: string;
  commentlikeCount: string;
  recomment: [
    {
      user: {
        usernmae: string;
        name: string;
        email: string;
        avatar: string;
        is_coach: boolean;
      };
      created_at: string;
      description: string;
      comment: number;
    }
  ];
}

export interface DefaultFeedData {
  id: number;
  user: User;
  title: string;
  group: {
    pk: number;
    name: string;
    members_count: string;
  };
  category: number;
  description: string;
  visited: number;
  created_at: string;
  updated_at: string;
  like_count: number;
  comments_count: number;
  highest_like_comments: [Comment];
  is_like: string;
  comment: [Comment];
  thumbnail?: string;
  images?: string;
}
