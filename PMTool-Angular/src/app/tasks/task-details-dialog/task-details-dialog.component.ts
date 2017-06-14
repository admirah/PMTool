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
    notMembers: Array<User>;
    owner: User;
    taskOwner: User;
    ownerAvailable: boolean;

    constructor(public dialogRef: MdDialogRef<TaskDetailsDialog>, private taskService: TaskService, private memberService: MemberService) {
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        this.item.createdOn = this.formatDate(new Date(this.item.createdOn));
        console.log(this.item);
        if (this.item.finishedOn) {
            this.item.finishedOn = this.formatDate(new Date(this.item.finishedOn));
        }
        console.log(this.item);


    }

    formatDate(date: Date): string {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
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
                if (ind === -1) res['member'] = this.owner;
                else res['member'] = this.members[ind];
                console.log(res);
                this.comments.push(res);
                console.log(this.comment);
                console.log(this.comments);
                this.comment.content = '';
                this.showButtonVar = false;
            }
        )
    }

    ngOnInit() {
        this.item = this.dialogRef._containerInstance.dialogConfig.data;
        console.log(this.item);
        this.comments = (this.item.comments) ? this.item.comments : [];
        this.comment = {content: ''};
        this.showButtonVar = false;
        this.isDataAvailable = false;
        let prId: any;
        if (!this.item.project.id) prId = this.item.project;
        else prId = this.item.project.id;
        this.memberService.getNotOnProject(prId).subscribe((members: any) => {
            this.notMembers = members;
            let ind = this.notMembers.findIndex(o => o.id == this.item.owner);
            this.owner = this.notMembers[ind];
            console.log(this.owner);
            this.memberService.get(prId).subscribe((response: any) => {
                this.members = response;
                console.log(this.members);
                this.comments.forEach((comment: any) => {
                    let ind = this.members.findIndex((member: User) =>
                        member.id == comment.user
                    );
                    let indTaskOwner = this.members.findIndex((member: User) =>
                        member.id == this.item.owner
                    );

                    if (indTaskOwner === -1) this.taskOwner = this.owner;
                    else this.taskOwner = this.members[indTaskOwner];
                    this.ownerAvailable = true;
                    console.log(this.taskOwner);
                    console.log(ind);
                    console.log(this.members[ind]);
                    console.log(this.owner);
                    if (ind === -1) comment['member'] = this.owner;
                    else comment['member'] = this.members[ind];
                    console.log(comment);
                });
                this.isDataAvailable = true;
            });
        });


    }
}
