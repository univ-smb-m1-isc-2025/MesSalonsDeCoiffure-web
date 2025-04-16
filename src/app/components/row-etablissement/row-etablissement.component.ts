import {Component, OnInit} from '@angular/core';
import {CardEtablissementComponent} from '../card-etablissement/card-etablissement.component';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/login/users.service';
import {Router} from '@angular/router';
import {Establishment} from '../../models/establishment.model';
import {EstablishmentService} from '../../services/establishment/establishment.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-row-etablissement',
  imports: [
    CardEtablissementComponent, CommonModule
  ],
  templateUrl: './row-etablissement.component.html',
  styleUrl: './row-etablissement.component.css'
})
export class RowEtablissementComponent implements OnInit {

  etablissements: Establishment[] = [];

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.getEstablishments();
  }

  private getEstablishments(): void {
    this.establishmentService.getEstablishment().subscribe(
      (res: Establishment[]) => {
        this.etablissements = res;
      },
      (err) => {
        console.error("Erreur lors de la récupération des établissements :", err);
      }
    );
  }
}
