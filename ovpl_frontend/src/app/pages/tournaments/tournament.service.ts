import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
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

  addTournament(payload) {
    return this.http.post(`${environment.API_URL}/tournaments/add`, payload);
  }

  updateTournament(payload) {
    return this.http.post(`${environment.API_URL}/tournaments/update`, payload);
  }

  getTournaments(payload) {
    return this.http.post(`${environment.API_URL}/tournaments/get`, payload);
  }

}
