import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Employee, LoginAuth } from '../shared-module/models/employee.model';
import { AppService } from '../shared-module/services/app.service';
import { AuthServiceService } from '../shared-module/services/auth/auth-service.service';

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
  public employeeId: number = 0;

  constructor(private appService: AppService,
              private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.createEmployeeForm();
    this.checkForLoggedInEmployee();
  }

  createEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      isNewForm: new FormControl(true, [Validators.required]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  validateEmail(): void {
    if (this.employeeForm.controls['isNewForm'].value) {
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
    } else{
      this.isEmailInValid = false;
    }
  }

  validatePhoneNumber(): void {
    if (this.employeeForm.controls['isNewForm'].value) {
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
    } else {
      this.isPhoneNumberInValid = false;
    }
  }

  onSubmit(): void {
    console.log('formValid?-', this.employeeForm.valid, this.employeeForm.value);
    if(this.employeeForm.valid && this.employeeForm.controls['isNewForm'].value) {
      this.employeeData = this.employeeForm.value;
      this.appService.saveEmployeeData(this.employeeData).subscribe((status) => {
        if(status) {
          this.employeeForm.reset();
        }
      });

    } else if (this.employeeForm.valid && !this.employeeForm.controls['isNewForm'].value) {
        this.employeeData = this.employeeForm.value;
        this.employeeData.id = this.employeeId;
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
    this.authService.$userData.subscribe((loginAuth: LoginAuth) => {
      if (Object.keys(loginAuth).length > 0 && loginAuth?.isLoginSuccess) {
        this.appService.getEmployeeData(loginAuth.empId).subscribe((employee: Employee) => {
          if(Object.keys(employee).length > 0) {
            this.employeeId = employee.id;
            this.employeeForm.controls['firstName'].setValue(employee.firstName);
            this.employeeForm.controls['lastName'].setValue(employee.lastName);
            this.employeeForm.controls['phoneNumber'].setValue(employee.phoneNumber);
            this.employeeForm.controls['email'].setValue(employee.email);
            this.employeeForm.controls['password'].setValue(employee.password);
            this.employeeForm.controls['isNewForm'].setValue(false);
          }
        });
      }
    });
  }
}
