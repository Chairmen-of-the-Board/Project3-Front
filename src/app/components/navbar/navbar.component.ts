import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  loggedIn: boolean = false;

  constructor(private router: Router, private accountService : AccountService) { }

  logout() {
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-account');
       
    this.accountService.accountId = '';
    this.accountService.accountUrl = '';
    this.router.navigateByUrl('/login');
  }

}
