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
/**
 * Created by Admira on 09-May-17.
 */
var core_1 = require("@angular/core");
var auth_service_1 = require("./../services/auth.service");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var project_service_1 = require("../services/project.service");
var add_project_dialog_component_1 = require("./add-project-dialog/add-project-dialog.component");
var delete_dialog_component_1 = require("../delete-dialog/delete-dialog.component");
var ProjectsComponent = (function () {
    function ProjectsComponent(auth, projectService, router, dialog) {
        this.auth = auth;
        this.projectService = projectService;
        this.router = router;
        this.dialog = dialog;
        this.projects = [];
        this.projectsMember = [];
    }
    ProjectsComponent.prototype.openDialog = function () {
        var _this = this;
        console.log('admira');
        var dialogRef = this.dialog.open(add_project_dialog_component_1.AddProjectDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 'Cancel') {
                _this.project = {};
            }
            else {
                result.owner = _this.auth.getId();
                _this.projectService.addNewProject(result).subscribe(function (project) {
                    _this.projects.push(project);
                });
            }
        });
    };
    ProjectsComponent.prototype.deleteProject = function (project) {
        var _this = this;
        var dialogRef = this.dialog.open(delete_dialog_component_1.DeleteDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result !== 'No') {
                _this.projectService.deleteProject(project).subscribe(function (response) {
                    var ind = _this.projects.indexOf(project);
                    _this.projects.splice(ind, 1);
                });
            }
        });
    };
    ProjectsComponent.prototype.leaveProject = function (project) {
        var _this = this;
        console.log(project);
        var dialogRef = this.dialog.open(delete_dialog_component_1.DeleteDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result !== 'No') {
                project.projects.forEach(function (proj) {
                    console.log(proj);
                    console.log(proj['userId'].toString() === _this.auth.getId().toString());
                    console.log(proj['project'] === project['id']);
                    if (proj['userId'].toString() === _this.auth.getId().toString() && proj['project'] === project['id']) {
                        _this.projectService.leaveProject(proj.id).subscribe(function (response) {
                            console.log(response);
                            var ind = _this.projectsMember.indexOf(project);
                            _this.projectsMember.splice(ind, 1);
                        });
                    }
                });
            }
        });
    };
    ProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            this.projectService.getMyProjects(this.auth.getId()).subscribe(function (projects) {
                _this.projects = projects;
            });
            this.projectService.getAllButMyProjects(this.auth.getId()).subscribe(function (projects) {
                _this.projectsMember = projects;
            });
        }
    };
    ProjectsComponent.prototype.goToProject = function (id) {
        this.router.navigate(['/project', id]);
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        selector: 'projects',
        templateUrl: "./projects.component.html",
        styleUrls: ['./projects.css'],
        providers: [auth_service_1.AuthService, project_service_1.ProjectService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, project_service_1.ProjectService, router_1.Router, material_1.MdDialog])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map