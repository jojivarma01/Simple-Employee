import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public employeesData: Employee[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getEmployeesData();
  }

  getEmployeesData(): void {
    this.appService.getEmployeesData().subscribe((data: Employee[]) => {
      if (this.employeesData) {
        this.employeesData = data;
      }
    });
  }

  removeEmployee(employee: Employee): void {
    this.appService.removeEmployee(employee.id).subscribe((data) => {
      console.log('employee remove status-', data);
    });
    this.getEmployeesData();
  }

}
