import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable, tap} from 'rxjs';
import {Establishment} from '../../models/establishment.model';
import {NewEtablishment} from '../../models/new-etablishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private BASE_URL = 'https://api.hairlab.oups.net';
  private localStorageKey = 'hairlab-user';

  constructor(private http: HttpClient) {}

  getEstablishment(){
    return this.http.get<Establishment[]>(this.BASE_URL + '/estabHL/estabs');
  }

  addEstablishment(estab: NewEtablishment): Observable<Establishment> {
    return this.http.post<Establishment>(this.BASE_URL + '/estabHL/addEstab', estab);
  }
}
