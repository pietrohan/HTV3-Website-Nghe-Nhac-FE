import {User} from "./user";
import {Song} from "./song";


export interface Playlist {

  id?: number;
  name: string;
  avatar: string;
  timeCreate: string;
  lastTimeEdit: string;
  users?: User;
  songs?: Song[];
  view_playlist: string;
}
