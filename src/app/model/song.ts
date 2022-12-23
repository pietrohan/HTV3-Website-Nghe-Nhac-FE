import {SongType} from "./songType";
import {Playlist} from "./playlist";
import {Author} from "./author";
import {Singer} from "./singer";

export interface Song {
  id?: number;
  name?: string;
  describeSong?: string;
  fileMp3?: string;
  avatar?: string;
  author?: Author;
  singer?: Singer[];
  user?: any;
  songTypeSet?: SongType;
  playListSet?:Playlist[];
  album?: any;
  viewSong?: any;
  dateCreateSong?: string;
  lastTimeEdit?: string;
}


