import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../exercise';
import {MatTableDataSource} from '@angular/material/table';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private subscriptionItem: Subscription;
  loadingState = false;

  constructor(private trainingService: TrainingService,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.loadingStateChanged.next(true);
    this.subscriptionItem = this.trainingService.finishedExerciseChanged.subscribe(
      (exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchCompletedFinishedExercises();
    this.uiService.loadingStateChanged.subscribe(loadState => this.loadingState = loadState);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string): void{
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.subscriptionItem.unsubscribe();
  }
}
