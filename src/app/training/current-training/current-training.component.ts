import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopCurrentTraining} from './stop-current-training';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  startOrResumeTimer(): void{
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100){
        clearInterval(this.timer);
      }
    }, 1000);
  }
  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopCurrentTraining, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.trainingExit.emit();
        }else {
          this.startOrResumeTimer();
        }
      }
    );
  }
}