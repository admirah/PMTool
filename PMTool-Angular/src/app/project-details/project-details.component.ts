/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {AddProjectDialog} from './add-project-dialog/add-project-dialog.component';
import {DeleteDialog} from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'project-details',
    template: `<tasks  [projectId]="projectId"></tasks>`,
    //  styleUrls: ['./projects.css'],
    providers: [AuthService, ProjectService]
})

export class ProjectDetailsComponent implements OnInit {
    projectId: number;

    constructor(private auth: AuthService, private route: ActivatedRoute,
                private projectService: ProjectService, private router: Router, public dialog: MdDialog) {
    }

    ngOnInit() {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        } else {
            this.route.params.subscribe(params => {
                this.projectId = +params['id'];
            });
        }
    }
}
