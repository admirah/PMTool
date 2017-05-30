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
var AddTaskDialog = (function () {
    function AddTaskDialog(dialogRef) {
        this.dialogRef = dialogRef;
        this.task = {};
        this.weights = [
            { value: 0, viewValue: "LOW" },
            { value: 1, viewValue: "MEDIUM" },
            { value: 2, viewValue: "HIGH" }
        ];
        this.task.taskStatus = this.dialogRef._containerInstance.dialogConfig.data;
    }
    return AddTaskDialog;
}());
AddTaskDialog = __decorate([
    core_1.Component({
        selector: 'add-task-dialog',
        templateUrl: "./add-task-dialog.component.html"
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], AddTaskDialog);
exports.AddTaskDialog = AddTaskDialog;
//# sourceMappingURL=add-task-dialog.component.js.map