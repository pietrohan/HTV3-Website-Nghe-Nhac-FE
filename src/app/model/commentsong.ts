import {Song} from "./song";
import {User} from "./user";


export interface Commentsong {
  id?: number;
  comment_content?: string;
  userComment?: User;
  songComment?: Song;
}
