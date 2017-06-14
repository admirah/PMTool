import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class TaskService {

    headers: Headers;

    constructor(private http: Http, private auth: AuthService) {
        this.headers = new Headers();
    }

    addNewTask(task: any): Observable<Response> {
        console.log(task);
        task.createdOn = new Date();
        task.owner = this.auth.getId();
        this.headers = new Headers();
        this.headers.append('Token', this.auth.getToken())
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/tasks', task, {headers: this.headers})
            .map(res => res.json());
    }

    addComment(comment: any): Observable<Response> {

        comment.user = this.auth.getId();
        //////console.log(comment);
        this.headers = new Headers();
        this.headers.append('Token', this.auth.getToken())
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/tasks/comment', comment, {headers: this.headers})
            .map(res => res.json());
    }

    changeTaskStatus(taskId: number, ind: number): Observable<Response> {
        let task = {
            taskStatus: ind,
        }
        if (ind === 4) {
            task['finishedOn'] = new Date();
        }
        else {
            task['finishedOn'] = null;
        }
        this.headers = new Headers();
        this.headers.append('Token', this.auth.getToken())
        this.headers.append('Content-Type', 'application/json');
        return this.http.patch('http://localhost:7010/projects/task/' + taskId, task, {headers: this.headers})
            .map(res => res.json());
    }

    deleteTask(task: any): Observable<Response> {
        console.log(task);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken())
        return this.http.delete('http://localhost:7010/projects/task/' + task.id, {headers: this.headers})
            .map(res => res.json());


    }

}
/**
 * Created by Admira on 20.05.2017..
 */
