import { RefObject } from "react";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface DefaultValue {
  id: number;
  description: string;
}

export interface CropAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SidebarProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
}

// export interface dropDownProps {
//   dropDown: boolean;
// }

export interface ListItem {
  id: number;
  title: string;
  link: string;
  onClick?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface TabMenu {
  icon: IconDefinition;
  size: SizeProp;
  text: string;
  tabName: string;
  activeTab: string;
  onClick: (tabName: string) => void;
}

export interface User {
  username: string;
  name: string;
  email: string;
  avatar: string | null;
  is_coach: boolean;
}

export interface Sender {
  pk: number;
  is_coach: boolean;
}

export interface ChatList {
  pk: number;
  receiver: string;
  created_at: string;
}

export interface ChatId {
  sender: Sender;
  room: ChatList;
  text: string;
  is_sender: boolean;
}
