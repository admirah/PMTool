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
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
var forms_1 = require("@angular/forms");
var AddProjectMemberDialog = (function () {
    function AddProjectMemberDialog(dialogRef) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.username = "";
        this.states = new Array();
        this.notMembers = this.dialogRef._containerInstance.dialogConfig.data;
        this.notMembers.forEach(function (x) {
            return _this.states.push(x.username);
        });
        console.log(this.notMembers);
        this.stateCtrl = new forms_1.FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(function (name) { return _this.filterStates(name); });
    }
    AddProjectMemberDialog.prototype.filterStates = function (val) {
        this.username = val;
        return this.states;
    };
    return AddProjectMemberDialog;
}());
AddProjectMemberDialog = __decorate([
    core_1.Component({
        selector: 'add-project-member-dialog',
        templateUrl: "./add-project-member-dialog.component.html"
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], AddProjectMemberDialog);
exports.AddProjectMemberDialog = AddProjectMemberDialog;
//# sourceMappingURL=add-project-member-dialog.component.js.map