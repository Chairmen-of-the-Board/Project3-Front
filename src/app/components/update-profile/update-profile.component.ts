import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserService } from 'src/app/services/update-user.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  email: FormControl = new FormControl(['']);
  password: FormControl = new FormControl(['']);
  address: FormControl = new FormControl(['']);
  phone: FormControl = new FormControl(['']);

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

  attemptUpdate(email: string, password: string, address: string, phone: string) {
    this.updateUserService.updateUser(this.user.id,
                                    email, password, address, phone).subscribe({
      next: (response) => {
      },
      error: (err) => {
        // if(err.status == 400) {
        // //   this.noticeMessage = 'Please Check Your Update Info';
        // } else {
          this.noticeMessage = err.error;
        // }
      },
      complete: () => {
        // this.router.navigateByUrl('/login');
      }
    })
  }

}
