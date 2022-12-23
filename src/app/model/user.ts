import {Role} from "./role";
import {Playlist} from "./playlist";

export interface User {

  id?: number;
  name?: string;
  address?: string;
  phoneNumber?: string;
  avatar?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: Role[];
  playlist?: Playlist[];

}
