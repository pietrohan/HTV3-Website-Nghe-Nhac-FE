import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../enronments/environment";
import {HttpService} from "./http-service.service";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ViewSongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllViewSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/view/song', this.httpService.getHttp());
  }

  getTotalView(idSong: number): Observable<any> {
    return this.http.get<any>(API_URL + `/home/view/song/${idSong}`)
  }

  updateViewSong(idUser: number, idSong: number): Observable<any> {
    return this.http.get(API_URL + `/home/view/song/${idUser}/${idSong}`, this.httpService.getHttp());
  }
}
