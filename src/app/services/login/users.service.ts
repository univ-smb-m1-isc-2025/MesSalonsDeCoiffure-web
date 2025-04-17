import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'https://api.hairlab.oups.net';
  private localStorageKey = 'hairlab-user';

  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<User | false> {
    return this.http.post<any>(this.BASE_URL + '/usersHL/checkUser', user).pipe(
      map(response => {
        if (response.trouve) {
          this.saveUserToLocalStorage(response.user);
          return response.user;
        } else {
          return false;
        }
      })
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.BASE_URL + '/usersHL/addUser', user).pipe(
      tap((registeredUser) => {
        this.saveUserToLocalStorage(registeredUser);
      })
    );
  }

  private saveUserToLocalStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.localStorageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/usersHL/users`);
  }

}
