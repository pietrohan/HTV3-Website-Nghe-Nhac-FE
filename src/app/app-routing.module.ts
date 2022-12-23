import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./home/layout/layout.component";
import {LoginComponent} from "./core/login/login.component";
import {RegisterComponent} from "./core/register/register.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {AuthGuardGuard} from "./guard/auth-guard.guard";
import {UserChangePasswordComponent} from "./user/user-change-password/user-change-password.component";
import {PlaySongComponent} from "./home/play-song/play-song.component";
import {UserSongComponent} from "./user/song/user-song/user-song.component";
import {PlaylistComponent} from "./playlist/playlist/playlist.component";
import {PlayPlaylistComponent} from "./home/play-playlist/play-playlist.component";
import {SearchComponent} from "./home/search/search.component";
import {NavbarMenuComponent} from "./home/navbar-menu/navbar-menu.component";
import {ListSongComponent} from "./song/list-song/list-song.component";
import {UserCreateSongComponent} from "./user/song/user-create-song/user-create-song.component";
import {UserEditSongComponent} from "./user/song/user-edit-song/user-edit-song.component";
import {AllplaylistComponent} from "./playlist/allplaylist/allplaylist.component";


const routes: Routes = [
  {
    path: 'navMenu',component: NavbarMenuComponent
  },
  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then(module => module.PlaylistModule)
  },
  {
    path: 'songs',
    component:ListSongComponent,
  },
  {
    path: 'playlistbyuser',
    component:AllplaylistComponent,
  },
  {
    path: 'song/song/song/:id',
    component:PlaySongComponent
  },
  {
    path: 'playlistbyuser/playlists/play/:id',
    component:PlayPlaylistComponent },
  {
    path: 'songs/song/:id',
    component:PlaySongComponent
  },
  {
    path: 'song',
    component:ListSongComponent
  },
  {
    path: 'song/song/:id',
    component:PlaySongComponent
  },
  {
    path: 'song/search/song/:id',
    component:PlaySongComponent },
  {
    path: 'navMenu',
    loadChildren: () => import('./home/navbar-menu/navbar-menu.module').then(module => module.NavbarMenuModule)
  },
  {
    path: 'song',
    component:ListSongComponent
  },
  {
    path: 'song/search/song/:id',
    component:PlaySongComponent },
  {
    path: 'navMenu',
    loadChildren: () => import('./home/navbar-menu/navbar-menu.module').then(module => module.NavbarMenuModule)
  },

  {
    path: '', component: LayoutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'song/:id', component: PlaySongComponent
  },
  {
    path: 'playlists/play/:id', component: PlayPlaylistComponent
  },
  {
    path: 'search',
    component:SearchComponent },
  {
    path: 'search/playlists/:id',
    component:PlayPlaylistComponent },
  {
    path: 'search/song/:id',
    component:PlaySongComponent },

  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userListSong',
    component: UserSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userplaylist',
    component: PlaylistComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userListSong/create',
    component: UserCreateSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "userListSong/edit/:id",
    component: UserEditSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userListSong/song/:id', component: PlaySongComponent
  },
  {
    path: 'changePassword',
    component: UserChangePasswordComponent,
    canActivate: [AuthGuardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
