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
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var auth_service_1 = require("../../services/auth.service");
var user_component_1 = require("../user.component");
var EditUserDialog = (function () {
    function EditUserDialog(dialogRef, auth) {
        this.dialogRef = dialogRef;
        this.auth = auth;
        this.userData = new user_component_1.User();
    }
    EditUserDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.getUser().subscribe(function (result) {
            _this.userData = result;
        });
    };
    EditUserDialog.prototype.onChange = function (event) {
        var file = event.srcElement.files["0"];
        var formData = new FormData();
        formData.append('image', file, file.name);
        this.userData.image = formData;
    };
    return EditUserDialog;
}());
EditUserDialog = __decorate([
    core_1.Component({
        selector: 'edit-user-dialog',
        templateUrl: "./edit-dialog.component.html"
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, auth_service_1.AuthService])
], EditUserDialog);
exports.EditUserDialog = EditUserDialog;
;
//# sourceMappingURL=edit-dialog.component.js.map