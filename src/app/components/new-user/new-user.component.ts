import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  @Input() user: User = new User();

  onFieldChange(event: Event, eventName: 'name' | 'email' | 'phone') {
    if (this.user) {
      this.user[eventName] = (<HTMLInputElement>event.target).value;
    }
  }
}
