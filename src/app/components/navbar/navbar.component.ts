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

  //loggedIn: boolean = false;

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-account');
    this.router.navigateByUrl('/login');

    
  }

  ngOninit() {
      // SET DARK MODE
    if (localStorage.getItem('dark-theme') =='true') {
      document.body.classList.toggle('dark-theme', true);
    } else {
      document.body.classList.toggle('dark-theme', false);
    }
  }

}
