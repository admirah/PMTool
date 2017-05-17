"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- NgModel lives here
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var logout_component_1 = require("./logout/logout.component");
var auth_guard_service_1 = require("./services/auth-guard.service");
var auth_service_1 = require("./services/auth.service");
var projects_component_1 = require("./projects/projects.component");
var project_service_1 = require("./services/project.service");
var user_component_1 = require("./user/user.component");
var ng2_select_1 = require("ng2-select");
var user_service_1 = require("./services/user.service");
var edit_dialog_component_1 = require("./user/edit-dialog/edit-dialog.component");
var add_project_dialog_component_1 = require("./projects/add-project-dialog/add-project-dialog.component");
var delete_dialog_component_1 = require("./delete-dialog/delete-dialog.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            material_1.MaterialModule,
            animations_1.BrowserAnimationsModule,
            ng2_select_1.SelectModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    redirectTo: '/projects',
                    pathMatch: 'full'
                },
                {
                    path: 'projects',
                    component: projects_component_1.ProjectsComponent,
                    canActivate: [auth_guard_service_1.AuthGuard]
                },
                {
                    path: 'login',
                    component: login_component_1.LoginComponent
                },
                {
                    path: 'register',
                    component: register_component_1.RegisterComponent
                },
                {
                    path: 'logout',
                    component: logout_component_1.LogoutComponent
                }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            logout_component_1.LogoutComponent,
            projects_component_1.ProjectsComponent,
            add_project_dialog_component_1.AddProjectDialog,
            user_component_1.UserComponent,
            delete_dialog_component_1.DeleteDialog,
            edit_dialog_component_1.EditUserDialog
        ],
        entryComponents: [add_project_dialog_component_1.AddProjectDialog, edit_dialog_component_1.EditUserDialog, delete_dialog_component_1.DeleteDialog],
        providers: [auth_service_1.AuthService, auth_guard_service_1.AuthGuard, project_service_1.ProjectService, user_service_1.UserService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map