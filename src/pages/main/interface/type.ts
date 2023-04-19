export interface User {
  avatar: any;
  email: string;
  is_coach: boolean;
  name: string;
  username: string;
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
  like_count: string;
  comments_count: string;
  highest_like_comments: [Comment];
  is_like: string;
  comment: [Comment];
  images: [{ url: string }];
}
