import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee, User } from '../../../models/employee.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public user = {} as User;
  public employeesData: Employee[] = [];
  public $userData = new BehaviorSubject<User>(this.user);

  constructor(private appService: AppService) { }

  authenticateUser(userEmail: string, userPassword: string): Employee[] {
    this.appService.getEmployeesData().subscribe((data: Employee[]) => {
      if(data) {
        const filteredEmployeeData = data.filter(x => x.email === userEmail);
        if(filteredEmployeeData.length > 0) 
        {
          if (filteredEmployeeData[0].password === userPassword) {
            const fullName = filteredEmployeeData[0].firstName+ ' ' +filteredEmployeeData[0].lastName;
            this.setToken(fullName, userEmail);
            console.log('auth, token', localStorage.getItem('user_token'));
            this.employeesData = data;
            this.appService.$loggedInEmployeeData.next(filteredEmployeeData[0]);
          }
        }
      } 
    }, (error: Error) => {
      return [] as Employee[];
    });

    return this.employeesData;
  }

  setToken(fullName: string, userEmail: string) {
    this.$userData.next({userName: fullName, userEmail});
    const tokenValue = {name: fullName, userEmail};
    localStorage.setItem('user_token', JSON.stringify(tokenValue) + Math.random());
  }
}
