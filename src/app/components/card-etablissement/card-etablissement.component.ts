import {Component, Input} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Establishment} from '../../models/establishment.model';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/login/users.service';

@Component({
  selector: 'app-card-etablissement',
  imports: [RouterModule],
  templateUrl: './card-etablissement.component.html',
  styleUrl: './card-etablissement.component.css'
})
export class CardEtablissementComponent {

  @Input() etablissement!: Establishment;
  user: User | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }


}
