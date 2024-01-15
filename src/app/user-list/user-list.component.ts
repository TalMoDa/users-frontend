import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserRequestDto, UserDto, UserService } from 'src/open-api';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  userList: UserDto[] = []
  dataSource: UserDto[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Phone', 'Edit', 'Delete'];

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(x => {

    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(x => {
      this.dataSource = x
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(UserDetailsComponent);
  }

  updateUser(user: UserDto) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: user
    });

  }

  deleteUser(userId: string) {
    this.userService.deleteUserById(userId).subscribe(x => { });
  }
}
