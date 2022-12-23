import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../enronments/environment";
import {HttpService} from "../http-service.service";
import {Commentplaylist} from "../../model/commentplaylist";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentplaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  // Lấy toàn bộ comment của playlist theo Id
  getCommentByPlaylist(idPlaylist: number | undefined): Observable<Commentplaylist[]> {
    return this.http.get<Commentplaylist[]>(API_URL + '/comment/playlist/' + idPlaylist);
  }

  // Lấy tổng like của playlist
  // getTotalLikePlaylist(idPlaylist: number): Observable<any> {
  //   return this.http.get<any>(API_URL + `/home/like/playlist/${idPlaylist}`)
  // }
  // Thêm comment vào playlist
  updateCommentPlaylist(commentPlaylist: Commentplaylist): Observable<any> {
    return this.http.post(API_URL + '/comment/playlist', commentPlaylist, this.httpService.getHttp());
  }
}
