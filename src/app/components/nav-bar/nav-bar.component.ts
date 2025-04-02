import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIcon
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  goToHome() {
    this.router.navigate(['/']); // Redirige vers la page de connexion
  }
}
