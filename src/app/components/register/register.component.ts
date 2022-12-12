import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: FormControl = new FormControl(null,[
    Validators.required,
    Validators.email]);
  password: FormControl = new FormControl('', 
  [Validators.required, Validators.minLength(6)]);
  firstname: FormControl = new FormControl('',
  [Validators.required]);
  lastname: FormControl = new FormControl('',
  [Validators.required]);
  address: FormControl = new FormControl('',
  [Validators.required]);
  phone: FormControl = new FormControl('',
  [Validators.required, Validators.minLength(10)]);

  noticeMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // userCredentials = new FormGroup({
  //   email: new FormControl('',[
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  // })
 

  attemptRegister(email: string, password: string, firstname: string, lastname: string, address: string, phone: string) {
    this.authService.register(email, password, firstname, lastname, address, phone).subscribe({
      next: (response) => {
        localStorage.setItem('current-user', ''+response.id);
      },
      error: (err) => {
          this.noticeMessage = err.error; 
      },
      complete: () => {
        this.router.navigateByUrl('/login');
      }
    })
  }

}
