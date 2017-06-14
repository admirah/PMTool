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
var material_1 = require("@angular/material");
var task_services_1 = require("../../services/task.services");
var member_service_1 = require("../../services/member.service");
var TaskDetailsDialog = (function () {
    function TaskDetailsDialog(dialogRef, taskService, memberService) {
        this.dialogRef = dialogRef;
        this.taskService = taskService;
        this.memberService = memberService;
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        this.item.createdOn = this.formatDate(new Date(this.item.createdOn));
        console.log(this.item);
        if (this.item.finishedOn) {
            this.item.finishedOn = this.formatDate(new Date(this.item.finishedOn));
        }
        console.log(this.item);
    }
    TaskDetailsDialog.prototype.formatDate = function (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    TaskDetailsDialog.prototype.showButton = function () {
        if (this.comment.length !== 0) {
            this.showButtonVar = true;
        }
        else {
            this.showButtonVar = false;
        }
    };
    TaskDetailsDialog.prototype.addComment = function () {
        var _this = this;
        this.comment.task = this.item.id; // promijeni
        console.log(this.comment);
        this.taskService.addComment(this.comment).subscribe(function (res) {
            console.log(res);
            var ind = _this.members.findIndex(function (member) {
                return member.id == res['user'];
            });
            console.log(ind);
            if (ind === -1)
                res['member'] = _this.owner;
            else
                res['member'] = _this.members[ind];
            console.log(res);
            _this.comments.push(res);
            console.log(_this.comment);
            console.log(_this.comments);
            _this.comment.content = '';
            _this.showButtonVar = false;
        });
    };
    TaskDetailsDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        console.log(this.item);
        this.comments = (this.item.comments) ? this.item.comments : [];
        this.comment = { content: '' };
        this.showButtonVar = false;
        this.isDataAvailable = false;
        var prId;
        if (!this.item.project.id)
            prId = this.item.project;
        else
            prId = this.item.project.id;
        this.memberService.getNotOnProject(prId).subscribe(function (members) {
            _this.notMembers = members;
            var ind = _this.notMembers.findIndex(function (o) { return o.id == _this.item.owner; });
            _this.owner = _this.notMembers[ind];
            console.log(_this.owner);
            _this.memberService.get(prId).subscribe(function (response) {
                _this.members = response;
                console.log(_this.members);
                _this.comments.forEach(function (comment) {
                    var ind = _this.members.findIndex(function (member) {
                        return member.id == comment.user;
                    });
                    var indTaskOwner = _this.members.findIndex(function (member) {
                        return member.id == _this.item.owner;
                    });
                    if (indTaskOwner === -1)
                        _this.taskOwner = _this.owner;
                    else
                        _this.taskOwner = _this.members[indTaskOwner];
                    _this.ownerAvailable = true;
                    console.log(_this.taskOwner);
                    console.log(ind);
                    console.log(_this.members[ind]);
                    console.log(_this.owner);
                    if (ind === -1)
                        comment['member'] = _this.owner;
                    else
                        comment['member'] = _this.members[ind];
                    console.log(comment);
                });
                _this.isDataAvailable = true;
            });
        });
    };
    return TaskDetailsDialog;
}());
TaskDetailsDialog = __decorate([
    core_1.Component({
        selector: 'task-details-dialog',
        templateUrl: "./task-details-dialog.component.html"
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, task_services_1.TaskService, member_service_1.MemberService])
], TaskDetailsDialog);
exports.TaskDetailsDialog = TaskDetailsDialog;
//# sourceMappingURL=task-details-dialog.component.js.map