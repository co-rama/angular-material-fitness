import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '../exercise';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {UiService} from '../../services/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: any[] = [];
  loadingState = false;
  private trainingSub: Subscription[] = [];
  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.trainingService.fetAvailableExercises();
    this.trainingSub.push(this.trainingService.exercisesChanged.subscribe(
      availableExercises => {
        this.exercises = availableExercises;
      }
    ));
    this.trainingSub.push(this.uiService.loadingStateChanged.subscribe(loadState => this.loadingState = loadState));
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy(): void {
    this.trainingSub.forEach(sub => sub.unsubscribe());
  }
}
