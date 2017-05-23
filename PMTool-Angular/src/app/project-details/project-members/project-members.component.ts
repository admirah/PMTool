/**
 * Created by Admira on 09-May-17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {AddProjectMemberDialog} from './add-project-member-dialog/add-project-member-dialog.component';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {MemberService} from "../../services/member.service";
import {User} from "../../user/user.component";

@Component({
  selector: 'project-members',
  templateUrl: './project-members.component.html',
})

export class ProjectMembersComponent implements OnInit {
  @Input() projectId: number;
  members: Array<User>;
  constructor(public dialog: MdDialog, private memberService: MemberService) {
  }

  private addMember(result: string) {
    const config = new MdDialogConfig();
      if(result != 'Cancel') {
        this.memberService.addMember({username: result, projectId: this.projectId}).subscribe((res: any) => {
          if(!res.ok){
            this.members.push(res);
          }
          else return;
        });
      }
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddProjectMemberDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'Cancel') {
        this.addMember(result);
      }
      });
  }

  ngOnInit() {
    this.memberService.get(this.projectId).subscribe((members: any) => {
      this.members = members;
    });
  }
}
