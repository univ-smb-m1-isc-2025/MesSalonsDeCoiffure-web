import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {UsersComponent} from './pages/login/users/users.component';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {CommandeComponent} from './pages/commande/commande.component';
import {ProfilComponent} from './pages/profil/profil.component';
import {AddEtablishmentComponent} from './pages/add-etablishment/add-etablishment.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {AddCoiffeurComponent} from './pages/add-coiffeur/add-coiffeur.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: UsersComponent },
  { path: 'commande/:id', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'addEtab', component: AddEtablishmentComponent, canActivate: [AdminGuard] },
  { path: 'addCoiff/:id', component: AddCoiffeurComponent, canActivate: [AdminGuard] }
];

