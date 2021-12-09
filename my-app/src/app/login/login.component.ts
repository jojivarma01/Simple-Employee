import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { AppService } from '../shared-module/services/app.service';
import { AuthServiceService } from '../shared-module/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public employeeLoginForm = new FormGroup({});
  public employeesData: Employee[] = [];
  public isCredentialsInValid: boolean = false;

  constructor(private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.createEmployeeLoginForm();
  }

  createEmployeeLoginForm(): void {
    this.employeeLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.employeeLoginForm.valid) {
      // this.appService.getEmployeesData().subscribe((data) => {
      //   if(data) {
      //     this.employeesData = data;
      //     const filteredEmployeeData = this.employeesData.filter(x => x.email === this.employeeLoginForm.controls['email'].value);
      //     if(filteredEmployeeData.length > 0) 
      //     {
      //       this.isCredentialsInValid = filteredEmployeeData[0].password !== this.employeeLoginForm.controls['password'].value;
      //       if (this.isCredentialsInValid) {
      //         this.appService.$loggedInEmployeeData.next(filteredEmployeeData[0]);
      //         this.router.navigate(['edit']);
      //       }
      //       else {
      //         this.isCredentialsInValid = true;
      //       }
      //     }
      //     else {
      //       this.isCredentialsInValid = true;
      //     }
      //   }
      // });
      const email = this.employeeLoginForm.controls['email'].value;
      const password = this.employeeLoginForm.controls['password'].value;
      this.employeesData = this.authService.authenticateUser(email, password);
      if (!this.employeesData) {
        this.isCredentialsInValid = true;
      } else {
        this.router.navigate(['edit']);
      }
    }
    else {
      this.isCredentialsInValid = true;
    }
  }

}
