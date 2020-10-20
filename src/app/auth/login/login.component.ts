import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UiService} from '../../services/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Fitness';
  hide = true;
  loadingState = false;
  private loadSub: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.title = this.title.toUpperCase();
    this.loadSub = this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
  }
  submit(form: NgForm): void{
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
    if (this.authService.isAuth()){
      this.router.navigate(['../training']);
    }
  }
  ngOnDestroy(): void{
    this.loadSub.unsubscribe();
  }
}
