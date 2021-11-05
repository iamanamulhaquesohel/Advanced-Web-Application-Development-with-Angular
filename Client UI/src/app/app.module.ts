import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/common/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';
import { DeleteDialogComponent } from './components/common/delete-dialog/delete-dialog.component';
import { HelpComponent } from './components/common/help/help.component';
import { BranchViewComponent } from './components/branch/branch-view/branch-view.component';
import { BranchCreateComponent } from './components/branch/branch-create/branch-create.component';
import { BranchUpdateComponent } from './components/branch/branch-update/branch-update.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { AppDataService } from './services/data/app-data.service';
import { AppNotifyService } from './services/common/app-notify.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    DeleteDialogComponent,
    HelpComponent,
    BranchViewComponent,
    BranchCreateComponent,
    BranchUpdateComponent,
    EmployeeViewComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatImportModule
    
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [AppDataService, AppNotifyService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
