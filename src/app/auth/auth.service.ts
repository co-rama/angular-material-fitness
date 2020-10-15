import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
  }
)
export class AuthService{
  private user: UserModel;
  authChange = new Subject<boolean>();
  constructor(private router: Router) {
  }
  registerUser(authData: AuthDataModel): void{
    this.user = {
      email : authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }
  login(authData: AuthDataModel): void{
    this.user = {
      email : authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }
  logout(): void{
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser(): UserModel{
    return {...this.user};
  }
  isAuth(): boolean{
    return this.user != null;
  }
}
