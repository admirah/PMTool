/**
 * Created by Admira on 10.05.2017..
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'login',
    template: '',
    providers: [AuthService]
})

export class LogoutComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) {}
    ngOnInit() {
        this.auth.logout();
        this.router.navigate(['login']);
    }
}
