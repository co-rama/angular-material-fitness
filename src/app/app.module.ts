import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FitnessRoutingModule } from './fitness-routing/fitness-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './materal/material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import {FormsModule} from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import {StopCurrentTraining} from './training/current-training/stop-current-training';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    StopCurrentTraining,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    FitnessRoutingModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopCurrentTraining]
})
export class AppModule { }
