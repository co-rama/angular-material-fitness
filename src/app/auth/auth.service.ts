import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../services/ui.service';
@Injectable({
  providedIn: 'root'
  }
)
export class AuthService{
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  constructor(private router: Router,
              private firestore: AngularFirestore,
              private angAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService) {
  }
  registerUser(authData: AuthDataModel): void{
    this.uiService.loadingStateChanged.next(true);
    this.angAuth.createUserWithEmailAndPassword(authData.email, authData.password).
      then(
        results => {
          this.uiService.loadingStateChanged.next(false);
        }
    ).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message);
    });
  }
  login(authData: AuthDataModel): void{
    this.uiService.loadingStateChanged.next(true);
    this.angAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(results => {
      this.uiService.loadingStateChanged.next(false);
    })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message);
      });
  }
  logout(): void{
    this.uiService.loadingStateChanged.next(false);
    this.angAuth.signOut().then(results => {}).catch(error => this.uiService.showSnackbar(error.message));
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
