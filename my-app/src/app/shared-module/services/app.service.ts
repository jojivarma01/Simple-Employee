import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, LoginAuth, UserAuthenticate } from '../../models/employee.model';
import { EmployeeDetailsModule } from 'src/app/employee-details/employee-details.module';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public rootURL = '/api';
  public initialEmployeeData = {} as Employee;

  constructor(private http: HttpClient) { }

  getEmployeesData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.rootURL + '/employees');
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

  getEmployeeData(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.rootURL + '/employee/' + employeeId);
  }

  authLogin(userAuthenticate: UserAuthenticate): Observable<LoginAuth> {
    return this.http.post<LoginAuth>(this.rootURL + '/auth', userAuthenticate);
  }

  public $loggedInEmployeeData = new BehaviorSubject<Employee>(this.initialEmployeeData);
}
