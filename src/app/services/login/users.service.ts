import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL + '/api/users');
  }
  ajoutUser(user:User): Observable<User> {
    return this.http.post<User>(this.BASE_URL + '/api/addUser', user);

  }
}
