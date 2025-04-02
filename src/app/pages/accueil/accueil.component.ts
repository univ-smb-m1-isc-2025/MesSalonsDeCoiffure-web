import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CardEtablissementComponent} from '../../components/card-etablissement/card-etablissement.component';
import {RowEtablissementComponent} from '../../components/row-etablissement/row-etablissement.component';

@Component({
  selector: 'app-accueil',
  imports: [
    ReactiveFormsModule,
    RowEtablissementComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
