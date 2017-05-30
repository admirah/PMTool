import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormControl} from "@angular/forms";
@Component({
    selector: 'add-project-member-dialog',
    templateUrl: `./add-project-member-dialog.component.html`
})
export class AddProjectMemberDialog {
    username: string;
    stateCtrl: FormControl;
    filteredStates: any;
    notMembers: any;
    states: Array<string>;


    constructor(public dialogRef: MdDialogRef<AddProjectMemberDialog>) {
        this.username = "";
        this.states = new Array<string>();
        this.notMembers = this.dialogRef._containerInstance.dialogConfig.data;
        this.notMembers.forEach((x: any) =>
            this.states.push(x.username));
        console.log(this.notMembers);
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
    }

    filterStates(val: any) {

        this.username = val;

        return this.states;
    }
}
