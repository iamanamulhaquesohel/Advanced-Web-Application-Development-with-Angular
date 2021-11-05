import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Branch } from 'src/app/models/maping/branch';
import { Employee } from 'src/app/models/maping/employee';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  //Define Employees and Branches
  Employees: Employee[] = [];
  Branches: Branch[] = [];
  //Data Passsing in Table
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(this.Employees);
  //Define Table Column
  columnList = ["employeeName", "employeePhone", "employeeSalary", "employeeJoinDate","branchId","actions"]

  //Shoring and Paging
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private dataService: AppDataService,
    private notifyService: AppNotifyService,
    private matDialog: MatDialog
  ) { }

  //get Branch table Data
  getBranchName(id: number): string{
    let Branch = this.Branches.find(b=> b.branchId == id);
    return Branch?.branchName || '';
  }

  //Delete Employee Method
  confirmDelete(item: Employee): void {
    this.matDialog.open(DeleteDialogComponent, {
      width: '450px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.dataService.deleteEmployee(Number(item.employeeId))
            .subscribe(r => {
              this.dataSource.data = this.dataSource.data.filter(e => e.employeeId != item.employeeId);
              this.notifyService.success("Employee has been Deleted", "DISMISS")
            }, err => {
              this.notifyService.fail("Failed to Delete Employee", "DISMISS")
            });
        }
      })
  }

  ngOnInit(): void {
    this.dataService.getEmployees()
      .subscribe(s => {
        this.Employees = s;
        this.dataSource.data = this.Employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.notifyService.fail("Cannot load Employee", "DISMISS");
        return throwError(error.error);
      });
    this.dataService.getBranches()
      .subscribe(r => {
        this.Branches = r;
      }, error => {
        this.notifyService.fail("Cannot load Branches", "DISMISS");
        return throwError(error.error);
      });
  }

}
