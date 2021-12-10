import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Employee, EmployeeId, User, UserAuthenticate } from '../../../models/employee.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public user = {} as User;
  public employeesData: Employee[] = [];
  public $userData = new BehaviorSubject<User>(this.user);

  constructor(private appService: AppService) { }

  authenticateUser(userEmail: string, userPassword: string) {
    const userAuthenticate: UserAuthenticate = {email: userEmail, password: userPassword};
    this.appService.authenticateEmployee(userAuthenticate).subscribe((res) => {
      if(res) {
        this.appService.$loggedInEmployeeData.next(res);
      }
    });
  }

  setToken(fullName: string, userEmail: string) {
    this.$userData.next({userName: fullName, userEmail});
    const tokenValue = {name: fullName, userEmail};
    localStorage.setItem('user_token', JSON.stringify(tokenValue) + Math.random());
  }
}
