import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { AppService } from '../shared-module/services/app.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public employeesData: Employee[] = [];
  public tempEmployeesData: Employee[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getEmployeesData();
  }

  getEmployeesData(): void {
    this.appService.getEmployeesData().subscribe((data: Employee[]) => {
      if (this.employeesData) {
        this.employeesData = data;
        this.tempEmployeesData = this.employeesData;
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
      this.employeesData = this.employeesData.filter(x => x.firstName.includes(searchedValue)
                                                          || x.lastName.includes(searchedValue));
    } else {
      this.employeesData = this.tempEmployeesData;
    }    
  }

}
