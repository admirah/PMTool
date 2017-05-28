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

    constructor(public dialog: MdDialog, private router: Router, private memberService: MemberService, private projectService: ProjectService) {
    }

    private addMember(result: string) {
        const config = new MdDialogConfig();
        if (result != 'Cancel') {
            this.memberService.addMember({username: result, projectId: this.projectId}).subscribe((res: any) => {
                if (!res.ok) {
                    this.members.push(res);
                }
                else return;
            });
        }
    }

    openDialog() {
        let dialogRef = this.dialog.open(AddProjectMemberDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result != 'Cancel') {
                this.addMember(result);
            }
        });
    }

    ngOnInit() {
        this.memberService.get(this.projectId).subscribe((members: any) => {
            this.members = members;
        });

        this.projectService.getProjectById(this.projectId).subscribe(res => {
            this.project = res;
            console.log(this.project)
            this.dataAvailable = true;
        })
    }

    showReports() {
        this.router.navigate(['/reports', this.projectId]);
    }
}
