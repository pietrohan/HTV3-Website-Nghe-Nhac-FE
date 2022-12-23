import {Injectable} from '@angular/core';

import {environment} from "../../../enronments/environment";
import {Observable} from "rxjs";
import {Playlist} from "../../model/playlist";
import {HttpClient} from "@angular/common/http";
import {Song} from "../../model/song";





const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Playlist[]> {
    let url = API_URL + '/playlist/';
    console.log(url)
    return this.httpClient.get<Playlist[]>(url);
  }
  save(playlist: Playlist,id:any): Observable<any> {
    let url = API_URL + '/playlist/create' + `/${id}`
    return this.httpClient.post<Playlist>(url,playlist);
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/${id}`);
  }
  showSongInPlaylist(id: any): Observable<any> {
    return this.httpClient.get(API_URL + `/songs/findsonginplaylist/${id}`);
  }

  getByUserId(id: any): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/findPlaylistByUser/${id}`);
  }

  getByName(name: any): Observable<any> {
    return this.httpClient.get(API_URL + `/search?name=` + `${name}`)

  }
  getPlaylistByName(name: any): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/search?name=` + `${name}`)

  }

  delete(id: number) {
    let url = API_URL + '/playlist/delete/' + `${id}`
    console.log(url)
    return this.httpClient.delete(url);

  }
  songInPlaylist(id: number){
    return this.httpClient.get<Playlist[]>(`${API_URL}/songs/findsonginplaylist/${id}`);
  }
  update(id: number, temp: Playlist) {
    return this.httpClient.put<Playlist>(`${API_URL}/playlist/edit/${id}`, temp);
  }
  addSongToPlaylist(playlistId: number , songId: number): Observable<any>{
    let url = API_URL + '/songs/'  + `${songId}` + '/playlist/' + `${playlistId}`
    return this.httpClient.get(url);
  }
  addSongToAllPlaylist(playlistId: number ): Observable<any>{
    let url = API_URL + '/playlist/' + `${playlistId}`
    return this.httpClient.get(url);
  }

////Sắp xếp bài hát theo lượt xem tăng dần
  sortByView(): Observable<any> {
    return this.httpClient.get(API_URL + `/sortByView`)
  }

//Sắp xếp bài hát theo lượt xem giam dần
  sortByViewDesc(): Observable<any> {
    return this.httpClient.get(API_URL + `/sortByViewDesc`)
  }
  // Lấy tổng like của playlist
  getTotalLikePlaylist(idPlaylist: number): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/playlist/allLike/${idPlaylist}`)
  }

  checkLikePlaylist(idPlaylist: number, idUser: number | undefined): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/checkLike/${idPlaylist}/${idUser}`)
  }

  likePlaylist(idPlaylist: number | undefined, idUser: number | undefined): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/like/${idPlaylist}/${idUser}`);
  }

  unlikeLikePlaylist(idPlaylist: number | undefined, idUser: number | undefined): Observable<any> {
    return this.httpClient.get(API_URL + `/playlist/unlike/${idPlaylist}/${idUser}`);
  }
  getAllPlaylistsNew(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + '/playlist/newest');
  }
  getAllPlaylistsDescView(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + '/playlist/mostview');
  }
  getAllPlaylistsDescLike(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + '/playlist/mostlike');
  }
  // Tăng 1 lượt view
  increaseViewPlaylist(idPlaylist: number | undefined): Observable<any> {
    return this.httpClient.get(API_URL + '/playlist/view/' + idPlaylist);
  }


}
