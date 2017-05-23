import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'add-project-member-dialog',
  templateUrl: `./add-project-member-dialog.component.html`
})
export class AddProjectMemberDialog {
  username: string;

  constructor(public dialogRef: MdDialogRef<AddProjectMemberDialog>) {
    this.username = "";
  }
}
