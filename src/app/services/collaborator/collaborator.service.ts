import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Collaborator} from '../../models/collaborator';
import {Observable} from 'rxjs';
import {NewCollaborator} from '../../models/new-collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private BASE_URL = 'https://api.hairlab.oups.net';
  private localStorageKey = 'hairlab-user';

  constructor(private http: HttpClient) {}

  addCollaborator(collab: NewCollaborator): Observable<any> {
    return this.http.post(`${this.BASE_URL}/collaboratorsHL/addCollaborator`, collab);
  }

  getCollaboratorsByEstablishment(establishmentId: number): Observable<any[]> {
    return this.http.get<Collaborator[]>(`${this.BASE_URL}/collaboratorsHL/byEstab?estabId=${establishmentId}`);
  }

}
