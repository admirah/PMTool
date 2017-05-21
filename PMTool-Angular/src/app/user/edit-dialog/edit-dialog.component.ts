import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AuthService} from "../../services/auth.service";
import {User} from "../user.component";

@Component({
    selector: 'edit-user-dialog',
    templateUrl: `./edit-dialog.component.html`
})
export class EditUserDialog implements OnInit {
    userData: User;

    constructor(public dialogRef: MdDialogRef<EditUserDialog>, private auth: AuthService) {
        this.userData = new User();
    }

    ngOnInit() {
        this.auth.getUser().subscribe(result => {
            this.userData = result;
        });
    }
}
;



