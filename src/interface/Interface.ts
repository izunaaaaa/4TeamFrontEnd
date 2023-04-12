import { RefObject } from "react";

export interface Feed {
  id: number;
  user: number;
  group: number;
  title: String;
  description: String;
  visited: number;
  medias: any;
  created_at: string;
  updated_at: string;
  comment: comment[];
  category: string | null;
}
export interface comment {
  id: number;
  created_at: string;
  description: string;
  user: string;
  feed: string;
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

export interface UplaodFeedValue {}

export interface CropAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Message {
  title: string;
  content: string;
  date: Date;
}

export interface SidebarProps {
  sidebar: boolean;
  setSidebar: (dropDown: boolean) => void;
}

export interface ListItem {
  id: number;
  title: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export type Note = {
  id: number;
  title: string;
  content: string;
  date: Date;
};

export interface MockUser {
  name: string;
  avatar: string;
  isMe: boolean;
}

export interface MockCont {
  id: number;
  user: MockUser;
  content: string;
  time: string;
}

export interface Letterlists {
  id: number;
  create_at: any;
  update_at: any;
  sender: number;
  receiver: number;
}
