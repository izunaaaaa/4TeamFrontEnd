import { group } from "interface/Interface";

export interface accessUser {
  id?: number;
  group?: group;
  is_signup?: boolean;
  name: string;
  phone_number: string;
  email: string;
}
