import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
  }
)
export class AuthService{
  private user: UserModel;
  constructor() {
  }
  registerUser(authData: AuthDataModel): void{
    this.user = {
      email : authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }
  login(authData: AuthDataModel): void{
    this.user = {
      email : authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }
  logout(): void{
    this.user = null;
  }
  getUser(): UserModel{
    return {...this.user};
  }
  isAuth(): boolean{
    return this.user != null;
  }
}
