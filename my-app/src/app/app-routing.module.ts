import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home-screen/home-screen.module').then(m => m.HomeScreenModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit-employee/edit-employee.module').then(m => m.EditEmployeeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./employee-details/employee-details.module').then(m => m.EmployeeDetailsModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
