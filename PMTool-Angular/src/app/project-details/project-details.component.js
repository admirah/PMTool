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
var ProjectDetailsComponent = (function () {
    function ProjectDetailsComponent(auth, route, projectService, router, dialog) {
        this.auth = auth;
        this.route = route;
        this.projectService = projectService;
        this.router = router;
        this.dialog = dialog;
    }
    ProjectDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            this.route.params.subscribe(function (params) {
                _this.projectId = +params['id'];
            });
        }
    };
    return ProjectDetailsComponent;
}());
ProjectDetailsComponent = __decorate([
    core_1.Component({
        selector: 'project-details',
        template: "<project-members [projectId]=\"projectId\"></project-members> <tasks  [projectId]=\"projectId\"></tasks>",
        //  styleUrls: ['./projects.css'],
        providers: [auth_service_1.AuthService, project_service_1.ProjectService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.ActivatedRoute,
        project_service_1.ProjectService, router_1.Router, material_1.MdDialog])
], ProjectDetailsComponent);
exports.ProjectDetailsComponent = ProjectDetailsComponent;
//# sourceMappingURL=project-details.component.js.map