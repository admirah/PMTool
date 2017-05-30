///<reference path="../../node_modules/ng2-dragula/components/dragular.module.d.ts"/>
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms'; // <-- NgModel lives here
import {AppComponent}  from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {RouterModule}   from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectService} from './services/project.service';
import {UserComponent} from './user/user.component';
import {SelectModule} from 'ng2-select';
import {UserService} from './services/user.service';
import {EditUserDialog} from './user/edit-dialog/edit-dialog.component';
import {AddProjectDialog} from './projects/add-project-dialog/add-project-dialog.component';
import {DeleteDialog} from './delete-dialog/delete-dialog.component';
import {TasksComponent} from './tasks/tasks.component';
import {DragulaModule} from 'ng2-dragula';
import {nvD3} from 'ng2-nvd3';
import {TaskDetailsDialog} from './tasks/task-details-dialog/task-details-dialog.component';
import {TaskService} from "./services/task.services";
import {AddTaskDialog} from "./tasks/add-task-dialog/add-task-dialog.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {ProjectMembersComponent} from "./project-details/project-members/project-members.component";
import {HttpModule} from "@angular/http";
import {AddProjectMemberDialog} from "./project-details/project-members/add-project-member-dialog/add-project-member-dialog.component";
import {MemberService} from "./services/member.service";
import {ReportsComponent} from "./reports/reports.component";
import {ReportsService} from "./services/reports.service";

import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
        SelectModule,
        DragulaModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/projects',
                pathMatch: 'full'
            },
            {
                path: 'projects',
                component: ProjectsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            }
            ,
            {
                path: 'project/:id',
                component: ProjectDetailsComponent
            }
            ,
            {
                path: 'reports/:id',
                component: ReportsComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        ProjectsComponent,
        AddProjectDialog,
        UserComponent,
        DeleteDialog,
        EditUserDialog,
        TasksComponent,
        TaskDetailsDialog,
        AddTaskDialog,
        ProjectDetailsComponent,
        ProjectMembersComponent,
        AddProjectMemberDialog,
        ReportsComponent, nvD3
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [AddProjectDialog, EditUserDialog, DeleteDialog, TaskDetailsDialog, AddTaskDialog, AddProjectMemberDialog],
    providers: [AuthService, ReportsService, AuthGuard, ProjectService, UserService, TaskService, MemberService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
