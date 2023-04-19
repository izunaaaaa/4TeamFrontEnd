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

export interface Message {
  title: string;
  content: string;
  date: Date;
}

export interface SidebarProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
}

export interface ListItem {
  id: number;
  title: string;
  link: string;
  onClick?: () => void;
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

export interface TabMenu {
  icon: IconDefinition;
  size: SizeProp;
  text: string;
  tabName: string;
  activeTab: string;
  onClick: (tabName: string) => void;
}

export interface Letterlists {
  id: number;
  create_at: any;
  update_at: any;
  sender: number;
  receiver: number;
}
