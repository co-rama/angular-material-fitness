import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
@Injectable({
  providedIn: 'root'
  }
)
export class AuthService{
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  constructor(private router: Router, private firestore: AngularFirestore,
              private angAuth: AngularFireAuth, private trainingService: TrainingService) {
  }
  registerUser(authData: AuthDataModel): void{
    this.angAuth.createUserWithEmailAndPassword(authData.email, authData.password).
      then(
        results => {
        }
    ).catch(error => {
      console.log(error.message);
    });
  }
  login(authData: AuthDataModel): void{
    this.angAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(results => {
    })
      .catch(error => console.log(error.message));
  }
  logout(): void{
    this.angAuth.signOut().then(results => console.log('success')).catch(error => console.log(error.message));
  }
  isAuth(): boolean{
    return this.isAuthenticated;
  }
  authListener(): void
  {
    this.angAuth.authState.subscribe(
      user => {
        if (user){
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        }else {
          this.trainingService.cancelSubscriptionFromFirebase();
          this.isAuthenticated = false;
          this.authChange.next(false);
          this.router.navigate(['/']);
        }
      }
    );
  }
}
