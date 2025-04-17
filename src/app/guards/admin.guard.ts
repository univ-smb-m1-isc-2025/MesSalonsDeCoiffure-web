import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/login/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(): boolean {
    const user = this.usersService.getCurrentUser();
    if (user && user.role === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/']); // ou '/login' si tu préfères
      alert("Accès réservé aux administrateurs.");
      return false;
    }
  }
}
