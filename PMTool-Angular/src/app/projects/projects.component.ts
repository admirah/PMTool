/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {AddProjectDialog} from './add-project-dialog/add-project-dialog.component';
import {DeleteDialog} from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'projects',
    templateUrl: `./projects.component.html`,
    styleUrls: ['./projects.css'],
    providers: [AuthService, ProjectService]
})

export class ProjectsComponent implements OnInit {

    projects: any;
    projectsMember: any;
    project: any;

    constructor(private auth: AuthService, private projectService: ProjectService, private router: Router, public dialog: MdDialog) {
        this.projects = [];
        this.projectsMember = [];
    }

    openDialog() {
        console.log('admira');
        let dialogRef = this.dialog.open(AddProjectDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result === 'Cancel') {
                this.project = {};
            } else {
                result.owner = this.auth.getId();
                this.projectService.addNewProject(result).subscribe(project => {
                    this.projects.push(project);
                });
            }
        });
    }

    deleteProject(project: any) {

        let dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result !== 'No') {
                this.projectService.deleteProject(project).subscribe(response => {
                    let ind = this.projects.indexOf(project);
                    this.projects.splice(ind, 1);
                });
            }
        });
    }

    leaveProject(project: any) {
        console.log(project);
        let dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result !== 'No') {
                project.projects.forEach((proj: any) => {
                    console.log(proj);
                    console.log(proj['userId'].toString() === this.auth.getId().toString());
                    console.log(proj['project'] === project['id']);
                    if (proj['userId'].toString() === this.auth.getId().toString() && proj['project'] === project['id']) {
                        this.projectService.leaveProject(proj.id).subscribe(response => {
                            console.log(response);
                            let ind = this.projectsMember.indexOf(project);
                            this.projectsMember.splice(ind, 1);
                        });
                    }
                });
            }
        });
    }

    ngOnInit() {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        } else {
            this.projectService.getMyProjects(this.auth.getId()).subscribe(projects => {
                this.projects = projects;
            });
            this.projectService.getAllButMyProjects(this.auth.getId()).subscribe(projects => {
                this.projectsMember = projects;
            });
        }

    }

    goToProject(id: any) {
        this.router.navigate(['/project', id]);
    }
}
