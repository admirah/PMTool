import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user.component';

@Injectable()
export class AuthService {

    headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
    }

    login(credentials: any) {
        this.headers = new Headers();
        let cred: string = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
        this.headers.append('Authorization', cred);
        this.headers.append('Content-Type', 'application/json');
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:7010/login', {headers: this.headers})
                .map(res => {
                    {
                        console.log(res);
                        return res.json();
                    }
                })
                .subscribe(
                    data => {
                        if (!data.Error) {
                            console.log(data);
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('id', data.id);
                            localStorage.setItem('user', data.username);
                            resolve(data);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    getId(): string {
        return localStorage.getItem('id');
    }

    loggedIn(): boolean {
        return localStorage.getItem('token') != null;
    }

    getUser(): Observable<User> {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.getToken())
        return this.http.get('http://localhost:7010/users/users/' + this.getId(), {headers: this.headers})
            .map(res => res.json());
    }

    getUserData(): any {
        return localStorage.getItem('user');
    }

    register(userData: any): Observable<Response> {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:7010/users/users/register', userData, {headers: this.headers})
            .map(res => res.json());
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('user');
    }

    editUserStorage(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}
