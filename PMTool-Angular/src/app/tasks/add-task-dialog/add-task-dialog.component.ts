import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'add-task-dialog',
    templateUrl: `./add-task-dialog.component.html`
})
export class AddTaskDialog {
    task: any;

    constructor(public dialogRef: MdDialogRef<AddTaskDialog>) {
        this.task = {};
        this.task.taskStatus = this.dialogRef._containerInstance.dialogConfig.data;
    }
}
