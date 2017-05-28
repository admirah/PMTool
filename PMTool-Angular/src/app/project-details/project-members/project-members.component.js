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
var add_project_member_dialog_component_1 = require("./add-project-member-dialog/add-project-member-dialog.component");
var material_1 = require("@angular/material");
var member_service_1 = require("../../services/member.service");
var project_service_1 = require("../../services/project.service");
var router_1 = require("@angular/router");
var ProjectMembersComponent = (function () {
    function ProjectMembersComponent(dialog, router, memberService, projectService) {
        this.dialog = dialog;
        this.router = router;
        this.memberService = memberService;
        this.projectService = projectService;
    }
    ProjectMembersComponent.prototype.addMember = function (result) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        if (result != 'Cancel') {
            this.memberService.addMember({ username: result, projectId: this.projectId }).subscribe(function (res) {
                if (!res.ok) {
                    _this.members.push(res);
                }
                else
                    return;
            });
        }
    };
    ProjectMembersComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(add_project_member_dialog_component_1.AddProjectMemberDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != 'Cancel') {
                _this.addMember(result);
            }
        });
    };
    ProjectMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.memberService.get(this.projectId).subscribe(function (members) {
            _this.members = members;
        });
        this.projectService.getProjectById(this.projectId).subscribe(function (res) {
            _this.project = res;
            console.log(_this.project);
            _this.dataAvailable = true;
        });
    };
    ProjectMembersComponent.prototype.showReports = function () {
        this.router.navigate(['/reports', this.projectId]);
    };
    return ProjectMembersComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProjectMembersComponent.prototype, "projectId", void 0);
ProjectMembersComponent = __decorate([
    core_1.Component({
        selector: 'project-members',
        templateUrl: './project-members.component.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialog, router_1.Router, member_service_1.MemberService, project_service_1.ProjectService])
], ProjectMembersComponent);
exports.ProjectMembersComponent = ProjectMembersComponent;
//# sourceMappingURL=project-members.component.js.map