import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../shared-module/models/employee.model';
import { AppService } from '../shared-module/services/app.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public addEmployeeForm = new FormGroup({});
  public employeesData: Employee[] = [];
  public employeeData: Employee = {} as Employee;
  public isEmailInValid: boolean = false;
  public isPhoneNumberInValid: boolean = false;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.createEmployeeForm();
  }

  createEmployeeForm(): void {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  validateEmail(): void {
    this.appService.getEmployeesData().subscribe((data) => {
      if(data) {
        this.employeesData = data;
        if(
          this.employeesData.filter(x => x.email === this.addEmployeeForm.controls['email'].value).length > 0
          && this.addEmployeeForm.controls['email'].valid) 
        {
          this.isEmailInValid = true;
        }
        else {
          this.isEmailInValid = false;
        }
      }
    });
  }

  validatePhoneNumber(): void {
    this.appService.getEmployeesData().subscribe((data) => {
      if(data) {
        this.employeesData = data;
        if(
          this.employeesData.filter(x => x.phoneNumber === this.addEmployeeForm.controls['phoneNumber'].value).length > 0) 
        {
          this.isPhoneNumberInValid = true;
        }
        else {
          this.isPhoneNumberInValid = false;
        }
      }
    });
  }

  onSubmit(): void {
    console.log('formValid?-', this.addEmployeeForm.valid, this.addEmployeeForm.value);
    if(this.addEmployeeForm.valid) {
      this.employeeData = this.addEmployeeForm.value;
      this.appService.saveEmployeeData(this.employeeData).subscribe((status) => {
        if(status) {
          this.addEmployeeForm.reset();
        }
      });
    }
  }

  onReset(): void {
    this.addEmployeeForm.reset();
  }

}
