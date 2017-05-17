import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

class Credentials {
    username: string;
    password: string;
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.css'],
    providers: [AuthService]
})

export class AppComponent {

    constructor(private auth: AuthService) {
    }

    loggedIn(): boolean {
        return this.auth.loggedIn();
    }
}
