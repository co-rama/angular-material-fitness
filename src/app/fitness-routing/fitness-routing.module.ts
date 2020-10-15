import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from '../auth/signup/signup.component';
import {LoginComponent} from '../auth/login/login.component';
import {CurrentTrainingComponent} from '../training/current-training/current-training.component';
import {TrainingComponent} from '../training/training.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthGuardService} from '../auth/auth-guard.service';
const routes: Routes  = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuardService]},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class FitnessRoutingModule { }
