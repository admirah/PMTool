import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {User} from '../user/user.component';
import {AuthService} from './auth.service';

@Injectable()
export class MemberService {

  headers: Headers;

  constructor(private http: Http, private auth: AuthService) {
    this.headers = new Headers();
  }

  get(projectId: number): Observable<User> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Token', this.auth.getToken());
    return this.http.get('http://localhost:7010/projects/member/onproject?projectId=' + projectId , {headers: this.headers})
      .map(res => res.json());

  }
  getNotOnProject(projectId: number): Observable<User> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Token', this.auth.getToken());
    return this.http.get('http://localhost:7010/projects/member/notonproject?projectId=' + projectId , {headers: this.headers})
        .map(res => res.json());

  }

  addMember(addMemberReq: any): Observable<Response> {
    console.log(addMemberReq);
    this.headers = new Headers();
    this.headers.append('Token', this.auth.getToken());
    this.headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:7010/projects/member/add-to-project', addMemberReq, {headers: this.headers})
      .map(res => res.json());
  }
}
