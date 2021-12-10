import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private reloadGridSubject: BehaviorSubject<any>;
  public reloadGrid: Observable<any>;

  constructor(private http: HttpClient) {
    this.reloadGridSubject = new BehaviorSubject<any>(false);
    this.reloadGrid = this.reloadGridSubject.asObservable();
  }
  /* 
    getCountryMaster(){
      return this.http.get(`${environment.admin_prefix_url}/location/countries`)
    } */

  addPlayer(payload) {
    return this.http.post(`${environment.API_URL}/players/add`, payload);
  }

  updatePlayer(payload) {
    return this.http.post(`${environment.API_URL}/players/update`, payload);
  }

  getPlayers(payload) {
    return this.http.post(`${environment.API_URL}/players/get`, payload);
  }

}