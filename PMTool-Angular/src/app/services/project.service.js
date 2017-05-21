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
var ProjectService = (function () {
    function ProjectService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.headers = new http_1.Headers();
    }
    ProjectService.prototype.getMyProjects = function (id) {
        console.log(id);
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken());
        return this.http.get('http://localhost:7010/projects/project/project?userid=' + id, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.getAllButMyProjects = function (id) {
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'x-www-form-urlencoded');
        this.headers.append('Token', this.auth.getToken());
        return this.http.get('http://localhost:7010/projects/project/projectMember?userid=' + id, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.addNewProject = function (project) {
        this.headers = new http_1.Headers();
        this.headers.append('Token', this.auth.getToken());
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/projects/project', project, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.deleteProject = function (project) {
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken());
        return this.http.delete('http://localhost:7010/projects/project/' + project.id, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.leaveProject = function (projectId) {
        console.log(projectId);
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.auth.getToken());
        return this.http.delete('http://localhost:7010/projects/member/' + projectId, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map