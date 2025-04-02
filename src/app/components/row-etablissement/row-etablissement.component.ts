import { Component } from '@angular/core';
import {CardEtablissementComponent} from '../card-etablissement/card-etablissement.component';

@Component({
  selector: 'app-row-etablissement',
  imports: [
    CardEtablissementComponent
  ],
  templateUrl: './row-etablissement.component.html',
  styleUrl: './row-etablissement.component.css'
})
export class RowEtablissementComponent {

}
