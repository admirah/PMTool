import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'add-project-dialog',
    templateUrl: `./add-project-dialog.component.html`
})
export class AddProjectDialog {
    project: any;

    constructor(public dialogRef: MdDialogRef<AddProjectDialog>) {
        this.project = {};
    }
}
