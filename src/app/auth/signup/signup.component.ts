import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  loadingState = false;
  private loadSub: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadSub = this.uiService.loadingStateChanged.subscribe(
      loadState => this.loadingState = loadState
    );
  }
  signUp(f: NgForm): void{
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
    if (this.authService.isAuth()){
      this.router.navigate(['../training']);
    }
  }
  ngOnDestroy(): void {
    this.loadSub.unsubscribe();
  }
}
