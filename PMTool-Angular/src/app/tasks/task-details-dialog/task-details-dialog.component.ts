import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {TaskService} from "../../services/task.services";

@Component({
    selector: 'task-details-dialog',
    templateUrl: `./task-details-dialog.component.html`
})
export class TaskDetailsDialog {
    item: any;
    comments: Array<any>;
    comment: any;
    showButtonVar: boolean;

    constructor(public dialogRef: MdDialogRef<TaskDetailsDialog>, private taskService: TaskService) {
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        console.log(this.item);
        this.comments = (this.item.comments) ? this.item.comments : [];
        this.comment = {content: ''};
        this.showButtonVar = false;
    }

    showButton() {
        if (this.comment.length !== 0) {
            this.showButtonVar = true;
        } else {
            this.showButtonVar = false;
        }
    }

    addComment() {
        this.comment.task = this.item.id; // promijeni
        console.log(this.comment);
        this.taskService.addComment(this.comment).subscribe(res => {
                console.log(res);
                this.comments.push(res);
                console.log(this.comment);
                console.log(this.comments);
                this.comment.content = '';
                this.showButtonVar = false;
            }
        )
    }
}

