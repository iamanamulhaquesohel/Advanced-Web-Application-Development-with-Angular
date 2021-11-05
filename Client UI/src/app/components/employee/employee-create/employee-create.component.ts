import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Branch } from 'src/app/models/maping/branch';
import { Employee } from 'src/app/models/maping/employee';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  //Define Employee and Branch
  Employees: Employee = new Employee();
  Branches: Branch[] = [];
  //Reactive form
  employeeForm: FormGroup = new FormGroup({
    employeeName: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    employeePhone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    employeeSalary: new FormControl('', [Validators.required]),
    employeeJoinDate: new FormControl(undefined, [Validators.required]),
    branchId: new FormControl('', [Validators.required])
  });

  get Form() {
    return this.employeeForm.controls;
  }

  constructor(
    private dataService: AppDataService,
    private notifyService: AppNotifyService,
    private datePipe: DatePipe
  ) { }
  create() {
    if (this.employeeForm.invalid) return;
    Object.assign(this.Employees, this.employeeForm.value);
    let dtpipe = this.datePipe.transform(this.Employees.employeeJoinDate, 'yyyy-MM-dd') as string;
    this.Employees.employeeJoinDate = new Date(dtpipe);
    this.dataService.createEmployee(this.Employees)
      .subscribe(s => {
        this.notifyService.success("Succeeded to Create Employee", "DISMISS");
        this.employeeForm.reset({});
        this.employeeForm.markAsPristine();
        this.employeeForm.markAsUntouched();
        this.Employees = new Employee();
      }, error => {
        this.notifyService.fail("Failed to Create Employee", "DISMISS");
        throwError(error.error);
      });
  }
  ngOnInit(): void {
    this.dataService.getBranches()
      .subscribe(s => {
        this.Branches = s;
      }, error => {
        this.notifyService.fail("Failed tp load Branches", "DISMISS");
        return throwError(error.error);
      });
  }

}
