import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../../models/reservation';
import {Observable} from 'rxjs';
import {NewReservation} from '../../models/new-reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = 'https://api.hairlab.oups.net';
  private localStorageKey = 'hairlab-user';

  constructor(private http: HttpClient) {}

  createReservation(reservation: NewReservation): Observable<any> {
    console.log("reservation envoyé", reservation)
    return this.http.post(this.BASE_URL+ '/appointmentsHL/addAppointment', reservation);
  }

  getReservationsByCollaborator(collaboratorId: number): Observable<Reservation[]> {
    console.log(`${this.BASE_URL}/appointmentsHL/byUserCollab?userId=${collaboratorId}`)
    const url = `${this.BASE_URL}/appointmentsHL/byUserCollab?userId=${collaboratorId}`;
    return this.http.get<Reservation[]>(url);
  }

}
