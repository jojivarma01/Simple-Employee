import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, LoginAuth } from '../models/employee.model';
import { AppService } from '../shared-module/services/app.service';
import { AuthServiceService } from '../shared-module/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public employeeLoginForm = new FormGroup({});
  public isCredentialsInValid: boolean = false;

  constructor(private authService: AuthServiceService,
              private appService: AppService,
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
      const email = this.employeeLoginForm.controls['email'].value;
      const password = this.employeeLoginForm.controls['password'].value;
      this.authService.authenticateUser(email, password);
      this.authService.$userData.subscribe((loginAuth: LoginAuth) => {
        if (Object.keys(loginAuth).length > 0 && loginAuth.isLoginSuccess) {
          this.appService.getEmployeeData(loginAuth.empId).subscribe((employee: Employee) => {
            if(Object.keys(loginAuth).length > 0) {
              this.appService.$loggedInEmployeeData.next(employee);
            }
          })
          this.isCredentialsInValid = true;
          this.router.navigate(['edit']);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

}
