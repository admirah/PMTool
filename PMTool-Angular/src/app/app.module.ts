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

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
        SelectModule,
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
        EditUserDialog
    ],
    entryComponents: [AddProjectDialog, EditUserDialog, DeleteDialog],
    providers: [AuthService, AuthGuard, ProjectService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
