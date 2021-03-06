import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, LoginAuth } from '../shared-module/models/employee.model';
import { AppService } from '../shared-module/services/app.service';
import { AuthServiceService } from '../shared-module/services/auth/auth-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public employeesData: Employee[] = [];
  public tempEmployeesData: Employee[] = [];
  public isAdminLoggedIn: boolean = false;

  constructor(private appService: AppService,
              private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getEmployeesData();
    this.getUserData();
  }

  getEmployeesData(): void {
    this.appService.getEmployeesData().subscribe((data: Employee[]) => {
      if (this.employeesData) {
        this.employeesData = data;
        this.tempEmployeesData = this.employeesData;
      }
    });
  }

  getUserData(): void {
    this.authService.$userData.subscribe((data: LoginAuth) => {
      if (data && data.isLoginSuccess && data.role === 'admin') {
        this.isAdminLoggedIn = true;
      }
    });
  }

  removeEmployee(employee: Employee): void {
    this.appService.removeEmployee(employee.id).subscribe((data) => {
      console.log('employee remove status-', data);
    });
    this.getEmployeesData();
  }

  onSearch(searchedValue: string): void {
    if (searchedValue)
    {
      this.employeesData = this.employeesData.filter(x => x.firstName.toUpperCase().includes(searchedValue.toUpperCase())
                                                          || x.lastName.toUpperCase().includes(searchedValue.toUpperCase()));
    } else {
      this.employeesData = this.tempEmployeesData;
    }    
  }

  editEmployee(employee: Employee): void {
    console.log('employee', employee);
    this.appService.$selectedEmployee.next(employee);
    this.router.navigate(['edit']);
  }

  addEmployee(): void {
    this.router.navigate(['add']);
  }

}
