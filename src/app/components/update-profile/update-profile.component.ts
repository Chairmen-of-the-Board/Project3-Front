import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserService } from 'src/app/services/update-user.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  email: FormControl = new FormControl(null,[
    Validators.required,
    Validators.email]);
  password: FormControl = new FormControl('', 
  [Validators.required, Validators.minLength(6)]);
  address: FormControl = new FormControl('',
  [Validators.required]);
  phone: FormControl = new FormControl('',
  [Validators.required, Validators.minLength(10)]);

  noticeMessage: string = '';
  userId: any;
  user!: User;

  constructor(private accountService: AccountService,
             private authService: AuthService,
             private updateUserService: UpdateUserService, private router: Router) { }

  ngOnInit(): void {
    
    this.userId = localStorage.getItem('current-user');
      this.authService.getUser(this.userId).then(res => {

          this.user = res;
          this.email.setValue(res.email);
          this.password.setValue(res.password);
          this.address.setValue(res.address);
          this.phone.setValue(res.phone);
      });
  }

  changeField() {
    this.noticeMessage = '';
    if (this.user.email === this.email.getRawValue() &&
    this.user.password === this.password.getRawValue() &&
    this.user.address === this.address.getRawValue() &&
    this.user.phone === this.phone.getRawValue()) {
      this.toggleUpdateButtonEnabled(false);
    } else {
      this.toggleUpdateButtonEnabled(true);
    }
  }

  toggleUpdateButtonEnabled(enable: boolean) {
    let button = document.getElementById('update_button') as HTMLButtonElement;
    let cls = button.getAttribute('class');
    if(enable) {
      button.setAttribute('class', 'btn btn-success btn-lg');
    } else {
      button.setAttribute('class', 'btn btn-success btn-lg disabled');
    }
  }

  attemptUpdate(email: string, password: string, address: string, phone: string) {
    this.updateUserService.updateUser(this.user.id,
                                    email, password, address, phone).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        // if(err.status == 400) {
        // //   this.noticeMessage = 'Please Check Your Update Info';
        // } else {
          this.noticeMessage = err.error;
        // }
      },
      complete: () => {
        this.noticeMessage = 'Profile updated.';
        this.toggleUpdateButtonEnabled(false);
        
        // this.router.navigateByUrl('/login');
      }
    })
  }

}
