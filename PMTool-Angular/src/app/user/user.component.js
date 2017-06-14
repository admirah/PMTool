"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Admira on 09-May-17.
 */
var core_1 = require("@angular/core");
var auth_service_1 = require("./../services/auth.service");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var project_service_1 = require("../services/project.service");
var user_service_1 = require("../services/user.service");
var edit_dialog_component_1 = require("./edit-dialog/edit-dialog.component");
var delete_dialog_component_1 = require("../delete-dialog/delete-dialog.component");
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var UserComponent = (function () {
    function UserComponent(auth, userService, router, dialog) {
        this.auth = auth;
        this.userService = userService;
        this.router = router;
        this.dialog = dialog;
        this.user = new User();
    }
    UserComponent.prototype.editUser = function () {
        var _this = this;
        var dialogRef = this.dialog.open(edit_dialog_component_1.EditUserDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result === 'Cancel') {
                _this.user = new User();
            }
            else {
                _this.userService.uploadImage(result.image, result.id).subscribe(function (res) { return console.log(res); });
                result.image = "";
                _this.userService.editUser(result).subscribe(function (editedUser) {
                    _this.user.name = editedUser.name;
                    _this.user.bio = editedUser.bio;
                    _this.user.email = editedUser.email;
                });
            }
        });
    };
    UserComponent.prototype.deleteUser = function () {
        var _this = this;
        var dialogRef = this.dialog.open(delete_dialog_component_1.DeleteDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result !== 'No') {
                _this.userService.deleteUser(_this.user.id).subscribe(function (response) {
                    return _this.router.navigate(['logout']);
                });
            }
        });
    };
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            this.auth.getUser().subscribe(function (result) {
                console.log(result);
                _this.user = result;
                _this.user.username = _this.auth.getUserData();
            });
        }
    };
    UserComponent.prototype.onChange = function (event) {
        console.log('onChange');
        var files = event.srcElement.files;
        console.log(files['0']);
        this.userService.addPhoto(files['0']).subscribe(function (result) { return console.log(result); });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: "./user.component.html",
        styleUrls: ['./user.css'],
        providers: [auth_service_1.AuthService, project_service_1.ProjectService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService, router_1.Router, material_1.MdDialog])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map