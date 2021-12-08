import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { AppService } from '../Services/app.service';

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
    let employee = {} as Employee;
    this.appService.$loggedInEmployeeData.subscribe((data) => {
      employee = data;
    });
    if(this.employeeForm.valid && !employee) {
      this.employeeData = this.employeeForm.value;
      const status = this.appService.saveEmployeeData(this.employeeData).subscribe(()=>{});
      console.log('status of save-', status);
      this.appService.getEmployeesData().subscribe((data) => {
        console.log('getData-', data);
      });
    } else if (this.employeeForm.valid && employee) {
        this.employeeData = this.employeeForm.value;
        this.employeeData.id = employee.id;
        const status = this.appService.updateEmployee(this.employeeData).subscribe(()=>{});
        console.log('update status of employee-', status);
        this.appService.getEmployeesData().subscribe((data) => {
          console.log('getData-', data);
        });
    }
  }

  checkForLoggedInEmployee(): void {
    let employee = {} as Employee;
    this.appService.$loggedInEmployeeData.subscribe((data) => {
      employee = data;
    });
    if (employee) {
      this.employeeForm.controls['firstName'].setValue(employee.firstName);
      this.employeeForm.controls['lastName'].setValue(employee.lastName);
      this.employeeForm.controls['phoneNumber'].setValue(employee.phoneNumber);
      this.employeeForm.controls['email'].setValue(employee.email);
      this.employeeForm.controls['password'].setValue(employee.password);
      this.employeeForm.controls['isNewForm'].setValue(false);
    }
  }
}
