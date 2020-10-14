import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from '../auth/signup/signup.component';
import {LoginComponent} from '../auth/login/login.component';
import {CurrentTrainingComponent} from '../training/current-training/current-training.component';
import {TrainingComponent} from '../training/training.component';
import {WelcomeComponent} from '../welcome/welcome.component';
const routes: Routes  = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent},
  {path: '', component: WelcomeComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class FitnessRoutingModule { }
