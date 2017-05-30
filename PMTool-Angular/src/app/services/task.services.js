"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var auth_service_1 = require("./auth.service");
var TaskService = (function () {
    function TaskService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.headers = new http_1.Headers();
    }
    TaskService.prototype.addNewTask = function (task) {
        console.log(task);
        task.owner = this.auth.getId();
        this.headers = new http_1.Headers();
        this.headers.append('Token', this.auth.getToken());
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/tasks', task, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.addComment = function (comment) {
        comment.user = this.auth.getId();
        //////console.log(comment);
        this.headers = new http_1.Headers();
        this.headers.append('Token', this.auth.getToken());
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/tasks/comment', comment, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.changeTaskStatus = function (taskId, ind) {
        var task = {
            taskStatus: ind
        };
        console.log(task);
        this.headers = new http_1.Headers();
        this.headers.append('Token', this.auth.getToken());
        this.headers.append('Content-Type', 'application/json');
        return this.http.patch('http://localhost:7010/projects/task/' + taskId, task, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService])
], TaskService);
exports.TaskService = TaskService;
/**
 * Created by Admira on 20.05.2017..
 */
//# sourceMappingURL=task.services.js.map