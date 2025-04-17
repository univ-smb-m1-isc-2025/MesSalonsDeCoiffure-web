import {Component, inject} from '@angular/core';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/login/users.service';
import {CollaboratorService} from '../../services/collaborator/collaborator.service';
import {Collaborator} from '../../models/collaborator';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NewCollaborator} from '../../models/new-collaborator';
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-coiffeur',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './add-coiffeur.component.html',
  styleUrl: './add-coiffeur.component.css'
})
export class AddCoiffeurComponent {
  searchTerm = '';
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  collaborators: Collaborator[] = [];

  establishmentId!: number;

  constructor(
    private usersService: UsersService,
    private collaboratorService: CollaboratorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupère l'id depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.establishmentId = +id; // cast en nombre
        this.fetchCollaborators();  // charge les collaborateurs après avoir l'id
      }
    });

    this.fetchUsers(); // peut être appelée directement
  }

  fetchUsers() {
    this.usersService.getAllUsers().subscribe(users => {
       this.allUsers = users;
    });
  }

  fetchCollaborators() {
    this.collaboratorService.getCollaboratorsByEstablishment(this.establishmentId).subscribe(data => {
      this.collaborators = data;

    });
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();

    // Récupère les IDs des users déjà collaborateurs
    const collaboratorUserIds = this.collaborators.map(c => c.user.id);

    this.filteredUsers = this.allUsers
      .filter(user =>
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(term) &&
        !collaboratorUserIds.includes(user.id) // exclut les collaborateurs déjà présents
      );
  }


  addCollaborator(user: User) {
    const collab: NewCollaborator = {
      userId: user.id,
      establishmentId: this.establishmentId
    };

    this.collaboratorService.addCollaborator(collab).subscribe({
      next: () => {
        this.openSnackBar('Enregistrement du nouveau collaborateur !', 'Fermer');
        this.fetchCollaborators();
        this.searchTerm = '';
        this.filteredUsers = [];
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du collaborateur :', err);
        this.openSnackBar('Erreur : impossible d\'ajouter le collaborateur.', 'Fermer');
      }
    });
  }


  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredUsers = [];
  }

}
