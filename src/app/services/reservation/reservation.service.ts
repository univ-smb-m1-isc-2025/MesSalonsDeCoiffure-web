import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../../models/reservation';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = 'https://api.hairlab.oups.net';
  private localStorageKey = 'hairlab-user';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<any> {
    console.log("reservation envoyé", reservation)
    return this.http.post(this.BASE_URL+ '/appointmentsHL/addAppointment', reservation);
  }
}
