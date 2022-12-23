import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Song} from "../../model/song";
import {environment} from 'src/enronments/environment';

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Song[]> {
    let url = API_URL + '/songs/';
    console.log(url)
    return this.httpClient.get<Song[]>(url);
  }

  getSongByUser(id:any): Observable<Song[]> {
    let url = API_URL + ('/songs/findByUser' + `/${id}`)
    return this.httpClient.get<Song[]>(url);
  }

  save(song: Song, id: any): Observable<any> {
    let url = API_URL + '/songs/create' + `/${id}`
    return this.httpClient.post<Song>(url, song);
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(API_URL + `/songs/${id}`);
  }

  getByName(name: any): Observable<any> {
    return this.httpClient.get(API_URL + `/songs/search?name=` + `${name}`)
  }

  getSongByAuthor(name: any): Observable<any> {
    return this.httpClient.get(API_URL + `/songs/search/author?author=` + `${name}`)
  }

  getSongBySinger(name: any): Observable<any> {
    return this.httpClient.get(API_URL + `/songs/search/singer?singer=` + `${name}`)
  }

  getAllSongsNew(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(API_URL + '/songs/newest');
  }
  getAllSongsDescView(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(API_URL + '/songs/mostview');
  }

  delete(id: number) {
    let url = API_URL + '/songs/delete/' + `${id}`
    console.log(url)
    return this.httpClient.delete(url);
  }

  update(id: number, temp: Song) {
    return this.httpClient.put<Song>(`${API_URL}/songs/edit/${id}`, temp);
  }


////Sắp xếp bài hát theo lượt xem tăng dần
  sortByView(): Observable<any> {
    return this.httpClient.get(API_URL + `/sortByView`)
  }

//Sắp xếp bài hát theo lượt xem giam dần
  sortByViewDesc(): Observable<any> {
    return this.httpClient.get(API_URL + `/sortByViewDesc`)
  }

  // addSongInPlaylist(id: number) {
  //   let url = API_URL + '/songs/createPlaylist/' + `${id}`
  //   console.log(url)
  //   return this.httpClient.(url);
  //
  // }

  // Tăng 1 lượt view
  increaseViewSong(idSong: number | undefined): Observable<any> {
    return this.httpClient.get(API_URL + '/songs/view/' + idSong);
  }
}
