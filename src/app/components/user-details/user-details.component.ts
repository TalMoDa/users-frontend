import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user: User = new User();
  @Output() usersUpdated = new EventEmitter<User[]>();
  userId: number = 0;
  actionType: string = '';
  editable: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => (this.userId = parseInt(params['id']))
    );

    this.userService
      .getUserById(this.userId)
      .subscribe((result: User) => (this.user = result));
  }

  onFieldChange(event: Event, eventName: 'name' | 'email' | 'phone') {
    if (this.user && (<HTMLInputElement>event.target).value.length <= 50) {
      this.user[eventName] = (<HTMLInputElement>event.target).value;
    }
  }

  toggleSubmit() {
    if (this.actionType === 'edit') {
      this.toggleEdit();
    } else if (this.actionType === 'delete') {
      this.toggleDelete();
    }
  }

  toggleEdit() {
    if (this.editable && this.validationForm()) {
      this.userService
        .updateUser(this.user)
        .subscribe((users: User[]) => this.usersUpdated.emit(users));
      this.router.navigate(['/users']);
      this.editable = !this.editable;
    } else if (!this.editable) {
      this.editable = !this.editable;
    }
  }

  toggleDelete() {
    this.userService
      .deleteUser(this.user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
    this.router.navigate(['/users']);
  }

  toggleAction(actionType: string) {
    this.actionType = actionType;
  }

  /**
   *
   * @returns true or false if the form is valid
   */

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
