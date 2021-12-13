import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit{

  isLogoutEnabled = false;
  constructor(private router: Router,
              private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.$userData.subscribe((data) => {
      if (Object.keys(data).length > 0) {
        this.isLogoutEnabled = true;
      } else {
        this.isLogoutEnabled = false;
      }
    })
  }

  onLogout() {
    this.authService.setTimerOut();
  }

  onLogin() {
    this.router.navigate(['login']);
  }

}
