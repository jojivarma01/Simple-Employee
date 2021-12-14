import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Employee, LoginAuth, User, UserAuthenticate } from '../../models/employee.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public loginAuth = {} as LoginAuth;
  public employeesData: Employee[] = [];
  public $userData = new BehaviorSubject<LoginAuth>(this.loginAuth);
  public $timerSubscription = Subscription;

  constructor(private appService: AppService,
              private router: Router) { }

  authenticateUser(userEmail: string, userPassword: string) {
    const userAuthenticate: UserAuthenticate = {email: userEmail, password: userPassword};
    this.appService.authLogin(userAuthenticate).subscribe(async (res) => {
      if(await res && res.isLoginSuccess) {
        this.setToken(res);
      }
      else {
        let loginAuth: LoginAuth = {
          isLoginSuccess: false,
          empId: 0,
          userToken: ''
        }
        this.setToken(loginAuth);
      }
    }, (error) => {
      let loginAuth: LoginAuth = {
        isLoginSuccess: false,
        empId: 0,
        userToken: ''
      }
      this.setToken(loginAuth);
    });
  }

  setToken(loggedInUser: LoginAuth) {
    localStorage.setItem('user_token', loggedInUser.userToken);
    this.$userData.next(loggedInUser);
    this.startTimer();
  }

  startTimer() {
    setTimeout(() => {
      this.setTimerOut();
    }, 3600000); // 1000ms = 1sec, 60000ms = 60sec, 3600000ms = 1hr
  }

  setTimerOut() {
    this.router.navigate(['login']);
    localStorage.removeItem('user_token');
    this.$userData.next({} as LoginAuth);
  }
}
