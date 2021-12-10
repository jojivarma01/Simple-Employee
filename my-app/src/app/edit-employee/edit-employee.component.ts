import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { AppService } from '../shared-module/services/app.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  public employeeForm = new FormGroup({});
  public employeeData = {} as Employee;
  public employeesData: Employee[] = [];
  public isEmailInValid: boolean = false;
  public isPhoneNumberInValid: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.createEmployeeForm();
    this.checkForLoggedInEmployee();
  }

  createEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      isNewForm: new FormControl(true, [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.min(10)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  validateEmail(): void {
    this.appService.getEmployeesData().subscribe((data) => {
      if(data) {
        this.employeesData = data;
        if(
          this.employeesData.filter(x => x.email === this.employeeForm.controls['email'].value).length > 0
          && this.employeeForm.controls['email'].valid) 
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
          this.employeesData.filter(x => x.phoneNumber === this.employeeForm.controls['phoneNumber'].value).length > 0) 
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
    console.log('formValid?-', this.employeeForm.valid, this.employeeForm.value);
    
    if(this.employeeForm.valid && this.employeeForm.controls['isNewForm'].value) {
      this.employeeData = this.employeeForm.value;
      console.log('empl data-', this.employeeData);
      this.appService.saveEmployeeData(this.employeeData).subscribe((status) => {
        if(status) {
          this.employeeForm.reset();
        }
      });

    } else if (this.employeeForm.valid && !this.employeeForm.controls['isNewForm'].value) {
        let employee = {} as Employee;
        this.appService.$loggedInEmployeeData.subscribe((data) => {
          employee = data;
        });
        this.employeeData = this.employeeForm.value;
        this.employeeData.id = employee.id;
        this.appService.updateEmployee(this.employeeData).subscribe((status) => {
          if(status) {
            this.employeeForm.reset();
          }
        });
    }
  }

  onReset(): void {
    this.employeeForm.reset();
  }

  checkForLoggedInEmployee(): void {
    this.appService.$loggedInEmployeeData.subscribe((employee: Employee) => {
      if (employee) {
        this.employeeForm.controls['firstName'].setValue(employee.firstName);
        this.employeeForm.controls['lastName'].setValue(employee.lastName);
        this.employeeForm.controls['phoneNumber'].setValue(employee.phoneNumber);
        this.employeeForm.controls['email'].setValue(employee.email);
        this.employeeForm.controls['password'].setValue(employee.password);
        this.employeeForm.controls['isNewForm'].setValue(false);
      }
    });
  }
}
