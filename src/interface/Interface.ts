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

export interface Sender extends User {}

export interface Messages {
  sender: Sender;
  room: number;
  text: string;
}

export interface Chattings {
  user: User;
  created_at: string;
  messages: Messages;
}
