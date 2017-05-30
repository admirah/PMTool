/**
 * Created by Admira on 09-May-17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {AddProjectMemberDialog} from './add-project-member-dialog/add-project-member-dialog.component';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {MemberService} from "../../services/member.service";
import {User} from "../../user/user.component";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";

@Component({
    selector: 'project-members',
    templateUrl: './project-members.component.html',
})

export class ProjectMembersComponent implements OnInit {
    @Input() projectId: number;
    members: Array<User>;
    project: any;
    dataAvailable: boolean;
    notMembers: Array<User>
    owner: User;

    constructor(public dialog: MdDialog, private router: Router, private memberService: MemberService, private projectService: ProjectService) {
    }

    addMember() {
        if (this.notMembers) {
            const config = new MdDialogConfig();
            config.data = this.notMembers;
            console.log(this.notMembers);

            let dialogRef = this.dialog.open(AddProjectMemberDialog, config);
            dialogRef.afterClosed().subscribe(result => {
                if (result != 'Cancel') {
                    console.log(result);

                    this.memberService.addMember({
                        username: result,
                        projectId: this.projectId
                    }).subscribe((res: any) => {
                        if (!res.ok) {
                            this.members.push(res);
                            let ind = this.notMembers.findIndex(n => n.username == result);
                            this.notMembers.splice(ind, 1);
                        }
                        else return;
                    });
                }
            });
        }
    }


    ngOnInit() {
        this.memberService.get(this.projectId).subscribe((members: any) => {
            this.members = members;


        });
        this.memberService.getNotOnProject(this.projectId).subscribe((members: any) => {
            this.notMembers = members;
            this.projectService.getProjectById(this.projectId).subscribe(res => {
                this.project = res;
                console.log(this.project)
                this.dataAvailable = true;
                let ind = this.notMembers.findIndex(o => o.id == res.owner);
                this.owner = this.notMembers[ind];
                this.notMembers.splice(ind, 1);
                console.log(this.owner);
                console.log(this.notMembers);
            })
        });


    }

    showReports() {
        this.router.navigate(['/reports', this.projectId]);
    }
}
