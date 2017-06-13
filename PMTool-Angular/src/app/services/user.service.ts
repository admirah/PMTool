import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {User} from '../user/user.component';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

    headers: Headers;

    constructor(private http: Http, private auth: AuthService) {
        this.headers = new Headers();
    }

    editUser(user: any): Observable<User> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.put('http://localhost:7010/users/users/' + user.id, user, {headers: this.headers})
            .map(res => res.json());

    }

    deleteUser(id: any): Observable<Response> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.delete('http://localhost:7010/users/users/' + id, {headers: this.headers})
            .map(res => res.json());

    }

    uploadImage(image: any, userId: number): Observable<Response> {
        this.headers = new Headers();
        this.headers.append('enctype', 'multipart/form-data');
        this.headers.append('Token', this.auth.getToken());
        return this.http.post('http://localhost:7010/users/users/upload?userId='+userId, image, {headers: this.headers})
            .map(r => r.json());
    }

}
