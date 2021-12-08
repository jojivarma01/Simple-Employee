import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public rootURL = '/api';
  public initialEmployeeData = {} as Employee;

  constructor(private http: HttpClient) { }

  getEmployeesData(): Observable<any> {
    return this.http.get<any>(this.rootURL + '/employees');
  }

  saveEmployeeData(employeeData: Employee): Observable<string> {
    return this.http.post<string>(this.rootURL + '/saveEmployee', employeeData);
  }

  removeEmployee(employeeId: number): Observable<string> {
    return this.http.delete<string>(this.rootURL + '/removeEmployee/' + employeeId);
  }

  updateEmployee(employee: Employee): Observable<string> {
    return this.http.put<string>(this.rootURL + '/updateEmployee/' + employee.id, employee);
  }

  public $loggedInEmployeeData = new BehaviorSubject<Employee>(this.initialEmployeeData);
}
