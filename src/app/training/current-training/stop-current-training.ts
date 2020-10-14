import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h2 mat-dialog-title>Are you sure, you want to cancel?</h2>
             <mat-dialog-content>
               <p>You already got {{ passedData.progress }}%</p>
             </mat-dialog-content>
             <mat-dialog-actions>
               <button mat-raised-button color="accent" [mat-dialog-close]="true">Yes</button>
               <button mat-raised-button color="accent" [mat-dialog-close]="false">No</button>
             </mat-dialog-actions>`,
  styles: ['button{ outline: none}']
  })
// tslint:disable-next-line:component-class-suffix
export class StopCurrentTraining {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}
