import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/models/userrequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  amount: FormControl = new FormControl(['']);
  description: FormControl = new FormControl(['']);
  targetEmail: FormControl = new FormControl(['']);
  accountId = localStorage.getItem('current-account') || '';
  request: UserRequest = {
    id: 0,
    requestAccId: parseInt(this.accountId),
    targetId: 0,
    amount: 0,
    description: '',
    status: 'Pending',
    creationDate: null
  };

  constructor(private requestService: RequestService) { }




  ngOnInit(): void {

    alert('requestform component');
     this.requestService.getUserByEmail('hikalamu@revature.com').subscribe(res=> {
        alert(res.firstname +'\n' + res.lastname);
      });
      
  }

  async attemptUpsert(amount: number, targetEmail: string, description: string){
    this.request.amount = amount;
    this.request.description = description;
    
    const ret = await this.requestService.getUserByEmail(this.targetEmail.getRawValue()).subscribe({
      next: (resp) => {
        this.request.id = resp.id;
      },
      error: () => {
        alert('No such account exists');
      },
      complete: () => {
        //complete

          this.requestService.upsertRequest(this.request).subscribe({
            next: (response) => {
            },
            error: (err) => {

            },
            complete: () => {
              this.submit.emit();
            }
          });
      }
    });

  
  }

}
