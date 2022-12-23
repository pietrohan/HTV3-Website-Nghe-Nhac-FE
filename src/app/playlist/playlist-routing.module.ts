import {RouterModule, Routes} from "@angular/router";
import {CreatePlaylistComponent} from "./create-playlist/create-playlist.component";
import {EditPlaylistComponent} from "./edit-playlist/edit-playlist.component";
import {NgModule} from "@angular/core";
import {PlaylistComponent} from "./playlist/playlist.component";
import {ListsongInOnePlaylistComponent} from "./listsong-in-one-playlist/listsong-in-one-playlist.component";
import {PlaySongComponent} from "../home/play-song/play-song.component";
import {ListSongComponent} from "../song/list-song/list-song.component";
import {AllplaylistComponent} from "./allplaylist/allplaylist.component";

const routes: Routes = [
  {
    path: '',
    component:PlaylistComponent
  },
  {
    path: 'playlist/song/:id',
    component:PlaySongComponent
  },
  {
    path: 'createplaylist',
    component: CreatePlaylistComponent
  },
  {
    path: "edit1/:id",
    component: EditPlaylistComponent
  },
  {
    path: "findsonginplaylist/:id",
    component: ListsongInOnePlaylistComponent
  },
  {
    path: 'playlistbyuser',
    component:AllplaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
