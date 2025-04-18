import {Component, inject} from '@angular/core';
import {Establishment} from '../../models/establishment.model';
import {EstablishmentService} from '../../services/establishment/establishment.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NewEtablishment} from '../../models/new-etablishment';

@Component({
  selector: 'app-add-etablishment',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-etablishment.component.html',
  styleUrl: './add-etablishment.component.css'
})
export class AddEtablishmentComponent {
  establishment: NewEtablishment = new NewEtablishment();
  private _snackBar = inject(MatSnackBar);


  constructor(private establishmentService: EstablishmentService, private router: Router) {}

  createEstablishment() {
    console.log(this.establishment)
    this.establishmentService.addEstablishment(this.establishment).subscribe({
      next: (response) => {
        console.log('Établissement créé avec succès :', response);
        this.router.navigate(['/']);
        this.openSnackBar('Établissement créé avec succès !', 'Fermer');
        },
      error: (err) => {
        console.error('Erreur lors de la création de l’établissement :', err);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
