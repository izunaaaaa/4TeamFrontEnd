export interface DefaultUserData {
  username: string;
  name: string;
  phone_number: string;
  email: string;
  gender: string;
  is_coach: boolean;
}

/**로그인한 유저데이터 */
export interface UserData extends DefaultUserData {
  id: number;
  date_joined: string;
  avatar: string;
  group: {
    pk: number;
    name: string;
    members_count: string;
  };
}

/**coach인증 user데이터 */
export interface userValue {
  name: string;
  email: string;
  phone_number: string;
}

export interface SignUpData extends DefaultUserData {
  password: string;
  passwordConfirm?: string;
  group: number;
  groupFile?: userValue[];
}

export interface LoginData {
  username: string;
  password: string;
}

export interface PostFeed {
  title: string;
  description?: string;
  category: number;
  image?: string;
}
