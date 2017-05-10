/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';

class UserData {
    name: string;
    surname: string;
    bio: string;
    email: string;
    username: string;
    password: string;
}

@Component({
    selector: 'register',
    templateUrl: `./register.component.html`,
    providers: [AuthService]
})

export class RegisterComponent implements OnInit {

    userData: UserData;

    constructor(private auth: AuthService,  private router: Router ) {
        this.userData = {
            name: '',
            surname: '',
            bio: '',
            email: '',
            username: '',
            password: ''
        };
    }

    ngOnInit() {
        if (this.auth.loggedIn()) {
            this.router.navigate(['home']);
        }
    }

    onRegister() {
        this.auth.register(this.userData);
    }
}
