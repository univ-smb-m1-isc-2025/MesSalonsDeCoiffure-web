import {Component, Input} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Establishment} from '../../models/establishment.model';

@Component({
  selector: 'app-card-etablissement',
  imports: [RouterModule],
  templateUrl: './card-etablissement.component.html',
  styleUrl: './card-etablissement.component.css'
})
export class CardEtablissementComponent {

  @Input() etablissement!: Establishment;


}
