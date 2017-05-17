/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';

class Credentials {
    username: string;
    password: string;
}

@Component({
    selector: 'login',
    templateUrl: `./login.component.html`,
    styleUrls: ['./login.css'],
    providers: [AuthService]
})

export class LoginComponent implements OnInit {
    credentials: Credentials;

    constructor(private auth: AuthService, private router: Router) {
        this.credentials = {username: '', password: ''};
    }

    ngOnInit() {
        if (this.auth.loggedIn()) {
            this.router.navigate(['projects']);
        }
    }

    onLogin() {

        console.log(this.credentials);
        this.auth.login(this.credentials);
        this.auth.login(this.credentials).then(response => {
            if (!response['Error']) {
                this.router.navigate(['projects']);
            }
        });
    }
}
