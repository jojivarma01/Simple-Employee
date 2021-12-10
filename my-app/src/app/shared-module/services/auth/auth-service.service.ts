import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Employee, LoginAuth, User, UserAuthenticate } from '../../../models/employee.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public loginAuth = {} as LoginAuth;
  public employeesData: Employee[] = [];
  public $userData = new BehaviorSubject<LoginAuth>(this.loginAuth);

  constructor(private appService: AppService) { }

  authenticateUser(userEmail: string, userPassword: string) {
    const userAuthenticate: UserAuthenticate = {email: userEmail, password: userPassword};
    this.appService.authLogin(userAuthenticate).subscribe((res) => {
      if(res) {
        this.setToken(res);
      }
    });
  }

  setToken(loggedInUser: LoginAuth) {
    this.$userData.next(loggedInUser);
    localStorage.setItem('user_token', loggedInUser.userToken);
  }
}
