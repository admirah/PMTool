import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {TaskService} from "../../services/task.services";
import {MemberService} from "../../services/member.service";
import {User} from "../../user/user.component";

@Component({
    selector: 'task-details-dialog',
    templateUrl: `./task-details-dialog.component.html`
})
export class TaskDetailsDialog implements OnInit {
    item: any;
    comments: Array<any>;
    comment: any;
    showButtonVar: boolean;
    members: Array<User>;
    isDataAvailable: boolean;

    constructor(public dialogRef: MdDialogRef<TaskDetailsDialog>, private taskService: TaskService, private memberService: MemberService) {
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        this.comments = (this.item.comments) ? this.item.comments : [];
        this.comment = {content: ''};
        this.showButtonVar = false;
        this.isDataAvailable = false;


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
                let ind = this.members.findIndex((member: User) =>
                    member.id == res['user']
                );
                console.log(ind);
                console.log(this.members[ind]);
                res['member'] = this.members[ind];

                this.comments.push(res);
                console.log(this.comment);
                console.log(this.comments);
                this.comment.content = '';
                this.showButtonVar = false;
            }
        )
    }

    ngOnInit() {
        this.memberService.get(this.item.project).subscribe((response: any) => {
            this.members = response;
            console.log(this.members);
            this.comments.forEach((comment: any) => {
                let ind = this.members.findIndex((member: User) =>
                    member.id == comment.user
                );
                console.log(ind);
                console.log(this.members[ind]);
                comment['member'] = this.members[ind];
                console.log(comment);
            });
            this.isDataAvailable = true;
        });
    }
}

