import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {UsersService} from '../../services/login/users.service';
import {User} from '../../models/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIcon, CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  user: User | null = null;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    console.log("init")
    this.user = this.usersService.getCurrentUser();
    console.log(this.user);
  }

  goToAccount() {
    if (this.user) {
      //this.usersService.logout();
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToAddEtab() {
    this.router.navigate(['/addEtab']);
  }
}
