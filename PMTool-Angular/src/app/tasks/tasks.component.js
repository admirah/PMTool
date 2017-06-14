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
var auth_service_1 = require("./../services/auth.service");
var router_1 = require("@angular/router");
var ng2_dragula_1 = require("ng2-dragula");
var task_details_dialog_component_1 = require("./task-details-dialog/task-details-dialog.component");
var material_1 = require("@angular/material");
var task_services_1 = require("../services/task.services");
var add_task_dialog_component_1 = require("./add-task-dialog/add-task-dialog.component");
var project_service_1 = require("../services/project.service");
var delete_dialog_component_1 = require("../delete-dialog/delete-dialog.component");
var TasksComponent = (function () {
    function TasksComponent(auth, taskService, projectService, router, dragulaService, dialog) {
        var _this = this;
        this.auth = auth;
        this.taskService = taskService;
        this.projectService = projectService;
        this.router = router;
        this.dragulaService = dragulaService;
        this.dialog = dialog;
        this.groups = [
            {
                name: 'Backlog',
                items: []
            },
            {
                name: 'Sprint',
                items: []
            },
            {
                name: 'In Progres',
                items: []
            },
            {
                name: 'QA',
                items: []
            }, {
                name: 'Done',
                items: []
            }
        ];
        this.task = {};
        dragulaService.dropModel.subscribe(function (value) { return _this.onDropModel(value, value.slice(1)); });
    }
    TasksComponent.prototype.onDropModel = function (val, args) {
        var _this = this;
        var el = args[0], target = args[1], source = args[2];
        el = null;
        if (target.id !== source.id) {
            var ind = this.groups.findIndex(function (item) { return item.name === target.id; });
            this.taskService.changeTaskStatus(this.task.id, ind).subscribe(function (result) {
                console.log(result);
                _this.task.finishedOn = result['finishedOn'];
            });
        }
    };
    TasksComponent.prototype.onClick = function (item) {
        console.log(item);
        this.task = item;
    };
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.getProjectById(this.projectId).subscribe(function (result) {
            _this.project = result;
            result.tasks.forEach(function (task) {
                if (task.taskStatus === 'BACKLOG') {
                    _this.groups[0].items.push(task);
                }
                else if (task.taskStatus === 'SPRINT') {
                    _this.groups[1].items.push(task);
                }
                else if (task.taskStatus === 'INPROGRESS') {
                    _this.groups[2].items.push(task);
                }
                else if (task.taskStatus === 'QA') {
                    _this.groups[3].items.push(task);
                }
                else if (task.taskStatus === 'DONE') {
                    _this.groups[4].items.push(task);
                }
            });
        });
    };
    TasksComponent.prototype.deleteTask = function (res) {
        var _this = this;
        var dialogRef = this.dialog.open(delete_dialog_component_1.DeleteDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result !== 'No') {
                _this.taskService.deleteTask(res).subscribe(function (response) {
                    if (res['taskStatus'] === 'BACKLOG') {
                        var ind = _this.groups[0].items.indexOf(res);
                        _this.groups[0].items.splice(ind, 1);
                    }
                    else if (res['taskStatus'] === 'SPRINT') {
                        var ind = _this.groups[1].items.indexOf(res);
                        _this.groups[1].items.splice(ind, 1);
                    }
                    else if (res['taskStatus'] === 'INPROGRESS') {
                        var ind = _this.groups[2].items.indexOf(res);
                        _this.groups[2].items.splice(ind, 1);
                    }
                    else if (res['taskStatus'] === 'QA') {
                        var ind = _this.groups[3].items.indexOf(res);
                        _this.groups[3].items.splice(ind, 1);
                    }
                    else if (res['taskStatus'] === 'DONE') {
                        var ind = _this.groups[4].items.indexOf(res);
                        _this.groups[4].items.splice(ind, 1);
                    }
                });
            }
        });
    };
    TasksComponent.prototype.seeDetails = function (item, group) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        var ind = this.groups.indexOf(group);
        var ind1 = this.groups[ind].items.indexOf(item);
        config.data = item;
        console.log(item);
        var dialogRef = this.dialog.open(task_details_dialog_component_1.TaskDetailsDialog, config);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.groups[ind].items[ind1].comments = result;
        });
    };
    TasksComponent.prototype.addTask = function (item) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        var ind = this.groups.indexOf(item);
        config.data = ind;
        var dialogRef = this.dialog.open(add_task_dialog_component_1.AddTaskDialog, config);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != 'Cancel') {
                result.projectId = _this.projectId;
                _this.taskService.addNewTask(result).subscribe(function (res) {
                    if (res['taskStatus'] === 'BACKLOG') {
                        _this.groups[0].items.push(res);
                    }
                    else if (res['taskStatus'] === 'SPRINT') {
                        _this.groups[1].items.push(res);
                    }
                    else if (res['taskStatus'] === 'INPROGRESS') {
                        _this.groups[2].items.push(res);
                    }
                    else if (res['taskStatus'] === 'QA') {
                        _this.groups[3].items.push(res);
                    }
                    else if (res['taskStatus'] === 'DONE') {
                        _this.groups[4].items.push(res);
                    }
                });
            }
        });
    };
    return TasksComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TasksComponent.prototype, "projectId", void 0);
TasksComponent = __decorate([
    core_1.Component({
        selector: 'tasks',
        templateUrl: "./tasks.component.html",
        // styleUrls: ['./register.css'],
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, task_services_1.TaskService, project_service_1.ProjectService, router_1.Router,
        ng2_dragula_1.DragulaService, material_1.MdDialog])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map