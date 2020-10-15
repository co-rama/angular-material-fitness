import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../exercise';
import {MatTableDataSource} from '@angular/material/table';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter(filterValue: string): void{
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
