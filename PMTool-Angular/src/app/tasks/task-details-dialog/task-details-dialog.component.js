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
var TaskDetailsDialog = (function () {
    function TaskDetailsDialog(dialogRef, taskService) {
        this.dialogRef = dialogRef;
        this.taskService = taskService;
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        console.log(this.item);
        this.comments = (this.item.comments) ? this.item.comments : [];
        this.comment = { content: '' };
        this.showButtonVar = false;
    }
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
            _this.comments.push(res);
            console.log(_this.comment);
            console.log(_this.comments);
            _this.comment.content = '';
            _this.showButtonVar = false;
        });
    };
    return TaskDetailsDialog;
}());
TaskDetailsDialog = __decorate([
    core_1.Component({
        selector: 'task-details-dialog',
        templateUrl: "./task-details-dialog.component.html"
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, task_services_1.TaskService])
], TaskDetailsDialog);
exports.TaskDetailsDialog = TaskDetailsDialog;
//# sourceMappingURL=task-details-dialog.component.js.map