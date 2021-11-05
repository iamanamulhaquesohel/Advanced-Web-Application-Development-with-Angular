import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../models/app-constants';
import { Branch } from '../../models/maping/branch';
import { Employee } from '../../models/maping/employee';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(
    private http: HttpClient
  ) { }

  //Branch Api Method

  //get All Branch
  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${AppConstants.apiUrl}/Branches`);
  }

  //get Branch by id
  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${AppConstants.apiUrl}/Branches/${id}`);
  }

  //create branch
  createBranch(Branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(`${AppConstants.apiUrl}/Branches`, Branch);
  }

  //update branch
  updateBranch(Branch: Branch): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/Branches/${Branch.branchId}`, Branch);
  }
  //delete branch
  deleteBranch(id: number): Observable<Branch> {
    return this.http.delete<Branch>(`${AppConstants.apiUrl}/Branches/${id}`);
  }

  //Employee Api Method

  //get all Employee
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${AppConstants.apiUrl}/Employees`);
  }

  //get Employee by id
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${AppConstants.apiUrl}/Employees/${id}`);
  }
  
  //create Employee
  createEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${AppConstants.apiUrl}/Employees`, Employee);
  }

  //update Employee
  updateEmployee(Employee: Employee): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/Employees/${Employee.employeeId}`, Employee);
  }

  //delete Employee
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${AppConstants.apiUrl}/Employees/${id}`);
  }


}
