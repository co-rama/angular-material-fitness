import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

const materials = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatMenuModule,
  MatStepperModule,
  MatCardModule,
  MatRadioModule,
  MatPaginatorModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materials
  ],
  exports: [materials]
})
export class MaterialModule { }
