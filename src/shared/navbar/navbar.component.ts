import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logoutButton: boolean = false;
  homePage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {}

  ngDoCheck() {
    if (this.authService.isLoggedIn()) {
      this.logoutButton = true;
    }
  }

  logout = () => {
    let logout = this.authService.logout();
    if (logout) {
      this.router.navigate(['/login']);
      this.logoutButton = false;
    }
  };
}
