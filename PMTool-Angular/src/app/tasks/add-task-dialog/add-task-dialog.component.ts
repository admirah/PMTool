import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'add-task-dialog',
    templateUrl: `./add-task-dialog.component.html`
})
export class AddTaskDialog {
    task: any;
    weights: any;

    constructor(public dialogRef: MdDialogRef<AddTaskDialog>) {
        this.task = {};
        this.weights  = [
            {value: 0, viewValue: "LOW"},
            {value: 1, viewValue: "MEDIUM"},
            {value: 2, viewValue: "HIGH"}
        ];
        this.task.taskStatus = this.dialogRef._containerInstance.dialogConfig.data;
    }
}
