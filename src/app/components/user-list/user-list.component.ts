import { Component } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: User[] = [];

  constructor() {}
}
