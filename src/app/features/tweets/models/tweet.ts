import { User } from "../../users/models/user";

export interface Tweet {
  id: string;
  body: string;
  user: User;
}
