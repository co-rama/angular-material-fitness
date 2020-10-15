import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
}
