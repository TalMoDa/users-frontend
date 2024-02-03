import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: User[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((result: User[]) => (this.users = result));
  }

  toggleNavigate(id: number | undefined) {
    this.router.navigate([`/userDetails/${id}`]);
  }
}
