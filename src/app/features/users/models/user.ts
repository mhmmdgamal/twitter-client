import { Tweet } from "../../tweets/models/tweet";

export interface User {
  id: string;
  firstName: string;
  lastName: string
  username: string;
  followersCount: number;
  followingsCount: number;
  tweets: Tweet[];
}
