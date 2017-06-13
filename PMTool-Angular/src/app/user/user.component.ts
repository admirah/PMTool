/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {UserService} from '../services/user.service';
import {EditUserDialog} from './edit-dialog/edit-dialog.component';
import {DeleteDialog} from '../delete-dialog/delete-dialog.component';


export class User {
    id: number;
    name: string;
    surname: string;
    email: any;
    bio: string;
    image?: any;
    password: string;
    username: string;
}
@Component({
    selector: 'user',
    templateUrl: `./user.component.html`,
    styleUrls: ['./user.css'],
    providers: [AuthService, ProjectService]
})

export class UserComponent implements OnInit {

    user: User;

    constructor(private auth: AuthService, private userService: UserService, private router: Router, public dialog: MdDialog) {
        this.user = new User();
    }

    editUser() {
        let dialogRef = this.dialog.open(EditUserDialog);
        dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result);
            if (result === 'Cancel') {
                this.user = new User();
            } else {
                this.userService.uploadImage(result.image, result.id).subscribe(res => console.log(res));
                result.image = "";
                this.userService.editUser(result).subscribe(editedUser => {
                        this.user.name = editedUser.name;
                        this.user.bio = editedUser.bio;
                        this.user.email = editedUser.email;
                    }
                )
                ;
            }
        });
    }

    deleteUser() {
        let dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result !== 'No') {
                this.userService.deleteUser(this.user.id).subscribe(response =>
                    this.router.navigate(['logout'])
                )
                ;
            }
        });
    }

    ngOnInit() {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        } else {
            this.auth.getUser().subscribe(result => {
                console.log(result);
                this.user = result;
                this.user.username = this.auth.getUserData();
            });
        }
    }

}
