import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Branch } from 'src/app/models/maping/branch';
import { Employee } from 'src/app/models/maping/employee';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  Employees: Employee = new Employee();
  Branches: Branch[] = [];
  //Reactive form
  employeeForm: FormGroup = new FormGroup({
    employeeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  update() {
    if (this.employeeForm.invalid) return;
    Object.assign(this.Employees, this.employeeForm.value);
    let dtpipe = this.datePipe.transform(this.Employees.employeeJoinDate, 'yyyy-MM-dd') as string;
    this.Employees.employeeJoinDate = new Date(dtpipe);
    this.dataService.updateEmployee(this.Employees)
      .subscribe(s => {
        this.notifyService.success("Succeeded to Update Employee", "DISMISS");
        this.employeeForm.markAsPristine();
        this.employeeForm.markAsUntouched();
      }, error => {
        this.notifyService.fail("Failed to Update Employee", "DISMISS");
        throwError(error.error);
      });
  }
  ngOnInit(): void {

    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataService.getEmployeeById(id)
      .subscribe(s => {
        this.Employees = s;
        this.employeeForm.patchValue(this.Employees);
      }, error => {
        this.notifyService.fail("Failed to load Target Employee", "DISMISS");
        throwError(error.error);
      });

    this.dataService.getBranches()
      .subscribe(s => {
        this.Branches = s;
      }, error => {
        this.notifyService.fail("Failed tp load Branches", "DISMISS");
        return throwError(error.error);
      });
  }

}
