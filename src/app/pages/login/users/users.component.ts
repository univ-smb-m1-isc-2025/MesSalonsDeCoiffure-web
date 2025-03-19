import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from '../../../services/login/users.service';
import {User} from '../../../models/user.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userList: User[] = []
  // pour le formulaire
  newUser : User = {firstName:'', lastName:'',email:''}

  constructor(private userService : UsersService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(){
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    })
  }

  addUser(user: User){
    this.userService.ajoutUser(this.newUser).subscribe(data => {
      this.userList.push(data);
      // réinitialisation du formulaire
      this.newUser = {firstName:'', lastName:'',email:''}
    })
  }

}
