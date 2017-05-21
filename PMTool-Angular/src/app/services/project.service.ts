import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class ProjectService {

    headers: Headers;

    constructor(private http: Http, private auth: AuthService) {
        this.headers = new Headers();
    }

    getMyProjects(id: any): Observable<Response> {
        console.log(id);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/projects/project/project?userid=' + id, {headers: this.headers})
            .map(res => res.json());

    }

    getAllButMyProjects(id: any): Observable<Response> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'x-www-form-urlencoded');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/projects/project/projectMember?userid=' + id, {headers: this.headers})
            .map(res => res.json());
    }

    addNewProject(project: any): Observable<Response> {
        this.headers = new Headers();
        this.headers.append('Token', this.auth.getToken())
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/project', project, {headers: this.headers})
            .map(res => res.json());
    }

    deleteProject(project: any): Observable<Response> {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.delete('http://localhost:7010/projects/project/' + project.id, {headers: this.headers})
            .map(res => res.json());


    }

    leaveProject(projectId: any): Observable<Response> {
        console.log(projectId)
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.delete('http://localhost:7010/projects/member/' + projectId, {headers: this.headers})
            .map(res => res.json());

    }

}
