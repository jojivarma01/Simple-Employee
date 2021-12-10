import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared-module/services/auth-guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home-screen/home-screen.module').then(m => m.HomeScreenModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit-employee/edit-employee.module').then(m => m.EditEmployeeModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./employee-details/employee-details.module').then(m => m.EmployeeDetailsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
