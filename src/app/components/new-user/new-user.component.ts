import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  @Input() user: User = new User();
  @Output() usersUpdated = new EventEmitter<User[]>();
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onFieldChange(event: Event, eventName: 'name' | 'email' | 'phone') {
    if (this.user) {
      this.user[eventName] = (<HTMLInputElement>event.target).value;
    }
  }

  createUser() {
    console.log('check');
    if (this.validationForm()) {
      console.log('check2');
      this.userService
        .createUser(this.user)
        .subscribe((users: User[]) => this.usersUpdated.emit(users));
      this.router.navigate(['/users']);
    }
  }

  validationForm() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const israelPhone =
      /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

    if (this.user.name === '') {
      this.error = 'Please enter a valid name.';
      return false;
    }

    if (!israelPhone.test(this.user.phone)) {
      this.error = 'Please enter a valid israeli number';
      return false;
    }

    if (!emailRegex.test(this.user.email)) {
      this.error = 'Please enter a valid email.';
      return false;
    }

    this.error = '';
    return true;
  }
}
