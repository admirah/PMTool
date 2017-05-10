/**
 * Created by Admira on 10.05.2017..
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: `./home.component.html`,
    providers: [AuthService]
})

export class HomeComponent implements OnInit {
    user: string;

    constructor(private auth: AuthService, private router: Router) {
        this.user = '';
    }

    ngOnInit() {
        this.user = this.auth.getUser();
    }
}
