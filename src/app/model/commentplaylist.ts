import {User} from "./user";
import {Playlist} from "./playlist";


export interface Commentplaylist {
  id?: number;
  comment_content?: string;
  userComment?: User;
  playListComment?: Playlist;
  dateCreate?: string;
}

