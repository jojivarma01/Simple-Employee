import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(employee: Employee): unknown {
    return employee.firstName + ' ' + employee.lastName;
  }

}
