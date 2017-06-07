import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class ReportsService {

    headers: Headers;

    constructor(private http: Http, private auth: AuthService) {
        this.headers = new Headers();
    }

    getFinishedByUser(projectid: any, userid: any): Observable<Response> {


        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/reports/task/numberoftasks?projectId='+projectid+'&userId='+userid, {headers: this.headers})
            .map(res => res.json());

    }

    getFinished(projectid: any): Observable<Response> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/reports/task/finished?projectId='+projectid, {headers: this.headers})
            .map(res => res.json());

    }

    getFinishedGrouped(taskStatus: any): Observable<Response> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/reports/task/finished/grouped?taskStatus='+ taskStatus, {headers: this.headers})
            .map(res => res.json());

    }

    getProjectById(id: any) {
        console.log(id);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.get('http://localhost:7010/projects/project/' + id, {headers: this.headers})
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
