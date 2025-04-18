import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from '../../../services/login/users.service';
import {User} from '../../../models/user.model';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NewUser} from '../../../models/new-user';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  isRegistering: boolean = false;

  user: User = new User();
  newUser: NewUser = new NewUser();

  constructor(private userService : UsersService, private router: Router ) { }

  ngOnInit(): void {
  }

  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }

  login() {

    this.userService.loginUser(this.user).subscribe(
      (res) => {
        if(res){
          console.log('res :', res);
          this.openSnackBar('Connexion réussie !', 'Fermer');
          window.location.href = '/';
        } else {
          this.openSnackBar('Échec de la connexion.', 'Fermer');
        }
      },
      (err) => {
        this.openSnackBar('Erreur lors de la connexion.', 'Fermer');
      }
    );
  }

  register() {
    console.log('Tentative de création avec :', this.newUser);
    this.userService.registerUser(this.newUser).subscribe(
      (res) => {
        console.log('creation réussite', res)
        this.openSnackBar('Enregistrement réussie !', 'Fermer');
        window.location.href = '/';

      },
      (err) => {
        console.error('Erreur de création du compte :', err);
        this.openSnackBar('Échec de l enregistrement', 'Fermer');
      }
    )
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
