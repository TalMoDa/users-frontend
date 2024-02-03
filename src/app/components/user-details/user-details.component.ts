import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user: User = new User();
  actionType: string = '';
  editable: boolean = false;

  onFieldChange(event: Event, eventName: 'name' | 'email' | 'phone') {
    if (this.user && (<HTMLInputElement>event.target).value.length <= 50) {
      this.user[eventName] = (<HTMLInputElement>event.target).value;
    }
  }

  toggleAction(actionType: string) {
    this.actionType = actionType;
  }
}
