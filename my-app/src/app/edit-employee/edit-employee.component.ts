import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.createEmployeeForm();
    this.checkForLoggedInEmployee();
  }

  createEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeData = this.employeeForm.value;
      this.employeeData.id = this.employeeId;
      this.appService.updateEmployee(this.employeeData).subscribe((status) => {
        if(status) {
          this.employeeForm.reset();
          this.router.navigate(['details']);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['details']);
  }

  checkForLoggedInEmployee(): void {
    this.appService.$selectedEmployee.subscribe((employee: Employee) => {
      if(Object.keys(employee).length > 0) {
        console.log('edit employee', employee);
        this.employeeId = employee.id;
        this.employeeForm.controls['firstName'].setValue(employee.firstName);
        this.employeeForm.controls['lastName'].setValue(employee.lastName);
        this.employeeForm.controls['phoneNumber'].setValue(employee.phoneNumber);
        this.employeeForm.controls['email'].setValue(employee.email);
        this.employeeForm.controls['password'].setValue(employee.password);
      }
    });
  }
}
