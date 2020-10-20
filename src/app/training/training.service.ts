import {Exercise} from './exercise';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService{
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();
  firebaseSub: Subscription[] = [];
  constructor(private firebase: AngularFirestore) {
  }
  fetAvailableExercises(): void{
    this.firebaseSub.push(this.firebase.collection('exercises').snapshotChanges()
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
      ));
  }
  fetchCompletedFinishedExercises(): void
  {
   this.firebaseSub.push(this.firebase.collection('finishedExercises').valueChanges()
     .subscribe(
       (exercises: Exercise[]) => {
         this.finishedExerciseChanged.next(exercises);
       }
    ));
  }
  cancelSubscriptionFromFirebase(): void
  {
    this.firebaseSub.forEach(sub => {
      sub.unsubscribe();
    });
  }
  getAvailableExercises(): Exercise[]{
    return this.availableExercises.slice();
  }
  startExercise(selectedId: string): void{
    // this.firebase.doc('exercises/' + selectedId).update({latestDate: new Date()});
    this.runningExercise = this.getAvailableExercises().find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }
  getRunningExercise(): Exercise{
    return this.runningExercise;
  }
  completeExercise(): void{
    this.addDataToDatabase({...this.runningExercise, date: new Date().toDateString(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number): void{
    this.addDataToDatabase({...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date().toDateString(),
      state: 'cancelled'}
      );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  private addDataToDatabase(exercise: Exercise): void
  {
    this.firebase.collection('finishedExercises').add(exercise);
  }
}
