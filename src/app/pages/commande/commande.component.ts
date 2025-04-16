import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-commande',
  imports: [],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID de la commande :', id);
    });
  }
}
