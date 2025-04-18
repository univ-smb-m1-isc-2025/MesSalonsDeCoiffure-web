import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {Reservation} from '../../models/reservation';
import {UsersService} from '../../services/login/users.service';
import {ReservationService} from '../../services/reservation/reservation.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  user: User = new User();
  editedUser: User = new User();
  isModified: boolean = false;
  reservations: Reservation[] = [];

  constructor(
    private usersService: UsersService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    const currentUser = this.usersService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
      this.editedUser = { ...currentUser };
      this.fetchReservations(currentUser.id);
    }
  }

  fetchReservations(clientId: number) {
    this.usersService.getReservationsByClientId(clientId).subscribe(

      (reservations) => {
        console.log(clientId,reservations)
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  onInputChange() {
    this.isModified = JSON.stringify(this.user) !== JSON.stringify(this.editedUser);
  }

  saveChanges() {
    if (this.isModified) {
      this.usersService.registerUser(this.editedUser).subscribe((updated) => {
        this.user = { ...updated };
        this.editedUser = { ...updated };
        this.isModified = false;
        alert('Modifications enregistrées !');
      });
    }
  }

  logout() {
    this.usersService.logout();
    window.location.href = '/login';
  }
}
