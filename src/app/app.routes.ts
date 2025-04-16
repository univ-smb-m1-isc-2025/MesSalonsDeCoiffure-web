import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {UsersComponent} from './pages/login/users/users.component';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {CommandeComponent} from './pages/commande/commande.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent }, // Page d'accueil par défaut
  { path: 'login', component: UsersComponent }, // Page de connexion
  { path: 'commande/:id', component: CommandeComponent }// Page de reservation
];
