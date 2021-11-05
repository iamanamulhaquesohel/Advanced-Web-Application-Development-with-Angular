import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BranchCreateComponent } from './components/branch/branch-create/branch-create.component';
import { BranchUpdateComponent } from './components/branch/branch-update/branch-update.component';
import { BranchViewComponent } from './components/branch/branch-view/branch-view.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { HelpComponent } from './components/common/help/help.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'branch', component: BranchViewComponent },
  { path: 'employee', component: EmployeeViewComponent },
  { path: 'branch-create', component: BranchCreateComponent },
  { path: 'branch-update/:id', component: BranchUpdateComponent },
  { path: 'employee-create', component: EmployeeCreateComponent },
  { path: 'employee-update/:id', component: EmployeeUpdateComponent },
  { path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
