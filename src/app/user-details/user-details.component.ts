import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUserRequestDto, UserDto, UserService } from 'src/open-api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: UserDto) {
  }

  new: boolean = false;
  // user= {} as CreateUserRequestDto;
  userDetailesForm!: FormGroup;
  ngOnInit(): void {
    this.userDetailesForm = this.formBuilder.group({
      name: "",
      email: "",
      phone: "",
    });
    this.data ? this.userDetailesForm.patchValue(this.data) : this.new = true
  };

  save() {
    var user = this.userDetailesForm.value;

    this.new ? this.createUser(user) : this.updateUser(user);
  }
  createUser(user: any) {
    this.userService.createUser(user).subscribe(x => {
    });
  }

  updateUser(user: any) {
    user.id = this.data.id;
    this.userService.updateUserById(this.data.id, user).subscribe(x => {
    });
  }


}
