import {Exercise} from './exercise';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService{
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  constructor(private firebase: AngularFirestore) {
  }
  fetAvailableExercises(): void{
    this.firebase.collection('exercises').snapshotChanges()
      .pipe(map(
        resultsArray => {
          return resultsArray.map(doc => {
            // @ts-ignore
            return { id: doc.payload.doc.id, ...doc.payload.doc.data()};
          });
        }
      ))
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        }
      );
  }
  getAvailableExercises(): Exercise[]{
    return this.availableExercises.slice();
  }
  startExercise(selectedId: string): void{
    this.runningExercise = this.getAvailableExercises().find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }
  getRunningExercise(): Exercise{
    return this.runningExercise;
  }
  completeExercise(): void{
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number): void{
    this.exercises.push({...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'}
      );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getCompletedOrCancelledExercises(): Exercise[]{
    return this.exercises.slice();
  }
}
