import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
    }
    login(credentials: any) {
        this.headers = new Headers();
        let cred: string = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
        console.log(cred);
        this.headers.append('Authorization', cred);
        this.headers.append('Content-Type', 'application/json');
        console.log(this.headers);

        return new Promise((resolve, reject) => {
            this.http.get('http://192.168.1.8:8082/login', {headers: this.headers})
                .map(res => {return res.json(); } )
                .subscribe(
                    data => {
                        console.log(data);
                        if (!data.Error) {localStorage.setItem('token', data.Token);
                        localStorage.setItem('user',data.User)
                        resolve(data); }},
                    error => {console.log(error); reject(error); }
                );
        });
    }
    getToken(): string {
        return localStorage.getItem('token');
    }
    loggedIn(): boolean {
        return localStorage.getItem('token') != null;
    }
    getUser():string{
        return localStorage.getItem('user');
    }
    register(userData: any) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
         this.http.post('http://192.168.1.8:8082/users/register', userData, {headers: this.headers})
         .map(res => res.json())
         .subscribe(
         data => console.log(data),
         error => console.log(error)
         );
        console.log(userData);
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}
