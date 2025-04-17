import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CardEtablissementComponent} from '../../components/card-etablissement/card-etablissement.component';
import {RowEtablissementComponent} from '../../components/row-etablissement/row-etablissement.component';
import {UsersService} from '../../services/login/users.service';
import {User} from '../../models/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [
    ReactiveFormsModule,
    RowEtablissementComponent,
    CommonModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  user: User | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }
}
