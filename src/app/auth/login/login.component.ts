import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Fitness';
  hide = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.title = this.title.toUpperCase();
  }
  submit(form: NgForm): void{
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
    if (form.valid){
     this.router.navigate(['../training']);
   }
  }
}
