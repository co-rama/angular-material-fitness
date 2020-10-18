import {Component, OnInit} from '@angular/core';
import {Exercise} from '../exercise';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
exercises: any[] = [];
  constructor(private trainingService: TrainingService, private firebase: AngularFirestore) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.trainingService.fetAvailableExercises();
    this.trainingService.exercisesChanged.subscribe(
      availableExercises => {
        this.exercises = availableExercises;
      }
    );
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
