/**example */
// export interface data {
//   id: Number;
//   name: string;
//   content: string;
// }

export interface Feed {
  id: number;
  user: string;
  group: string;
  title: String;
  description: String;
  visited: Number;
  medias: any;
}

export interface Comment {
  id: number;
  user: number;
  feed: number;
  description: string;
}

export interface FormValue {
  Id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone_number: string;
  email: string;
  gender: string;
  group: number;
  is_coach: boolean;
}

export interface SidebarProps {
  sidebar: boolean;
}
