import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';
import {DragulaService} from 'ng2-dragula';
import {TaskDetailsDialog} from './task-details-dialog/task-details-dialog.component';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {TaskService} from '../services/task.services';
import {AddTaskDialog} from './add-task-dialog/add-task-dialog.component';
import {ProjectService} from '../services/project.service';


@Component({
    selector: 'tasks',
    templateUrl: `./tasks.component.html`,
    // styleUrls: ['./register.css'],
    providers: [AuthService]
})

export class TasksComponent implements OnInit {
    groups: Array<any>;
    project: any;
    task: any;
    @Input() projectId: number;

    constructor(private auth: AuthService, private taskService: TaskService, private projectService: ProjectService, private router: Router,
                private dragulaService: DragulaService, public dialog: MdDialog) {

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
        dragulaService.dropModel.subscribe((value: any) => this.onDropModel(value, value.slice(1)));
    }

    onDropModel(val: any, args: any) {
        let [el, target, source] = args;
        el = null;
        if (target.id !== source.id) {
            let ind = this.groups.findIndex(item => item.name === target.id);
            this.taskService.changeTaskStatus(this.task.id, ind).subscribe(result =>
                console.log(result));
        }
    }

    onClick(item: any): void {
        console.log(item);
        this.task = item;
    }

    ngOnInit() {
        this.projectService.getProjectById(this.projectId).subscribe((result: any) => {
            this.project = result;

            result.tasks.forEach((task: any) => {
                if (task.taskStatus === 'BACKLOG') {
                    this.groups[0].items.push(task);
                } else if (task.taskStatus === 'SPRINT') {
                    this.groups[1].items.push(task);
                } else if (task.taskStatus === 'INPROGRESS') {
                    this.groups[2].items.push(task);
                } else if (task.taskStatus === 'QA') {
                    this.groups[3].items.push(task);
                } else if (task.taskStatus === 'DONE') {
                    this.groups[4].items.push(task);
                }

            });
        });
    }

    seeDetails(item: any, group: any) {
        const config = new MdDialogConfig();
        let ind = this.groups.indexOf(group);
        let ind1 = this.groups[ind].items.indexOf(item);
        config.data = item;
        let dialogRef = this.dialog.open(TaskDetailsDialog, config);
        dialogRef.afterClosed().subscribe(result => {
            this.groups[ind].items[ind1].comments = result;
        });
    }

    addTask(item: any) {
        const config = new MdDialogConfig();
        let ind = this.groups.indexOf(item);
        config.data = ind;
        let dialogRef = this.dialog.open(AddTaskDialog, config);
        dialogRef.afterClosed().subscribe(result => {
           if(result!='Cancel') {result.projectId = this.projectId;
            this.taskService.addNewTask(result).subscribe(res => {
                if (res['taskStatus'] === 'BACKLOG') {
                    this.groups[0].items.push(res);
                } else if (res['taskStatus'] === 'SPRINT') {
                    this.groups[1].items.push(res);
                } else if (res['taskStatus'] === 'INPROGRESS') {
                    this.groups[2].items.push(res);
                } else if (res['taskStatus'] === 'QA') {
                    this.groups[3].items.push(res);
                } else if (res['taskStatus'] === 'DONE') {
                    this.groups[4].items.push(res);
                }
            });}
        });
    }

}
