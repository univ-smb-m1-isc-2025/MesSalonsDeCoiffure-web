import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {UsersComponent} from './pages/login/users/users.component';

export const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},{
  path: 'users',
  component: UsersComponent,
}];
