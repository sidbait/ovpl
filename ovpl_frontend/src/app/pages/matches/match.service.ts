import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
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

  addMatch(payload) {
    return this.http.post(`${environment.API_URL}/matches/add`, payload);
  }

  updateMatch(payload) {
    return this.http.post(`${environment.API_URL}/matches/update`, payload);
  }

  getMatches(payload) {
    return this.http.post(`${environment.API_URL}/matches/get`, payload);
  }

}