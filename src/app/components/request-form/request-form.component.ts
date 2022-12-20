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
    targetId: '',
    targetEmail: '',
    amount: 0,
    description: '',
    status: 'Pending',
    creationDate: null
  };
  
  constructor(private requestService: RequestService) { }




  ngOnInit(): void {

  }

  async attemptUpsert(amount: number, targetEmail: string, description: string){
    this.request.amount = amount;
    this.request.targetEmail = targetEmail;
    this.request.description = description;


    this.requestService.upsertRequest(this.request).subscribe({
      next: (response) => {
        //next
      },
      error: (err) => {

        alert(err.error.message);
      },
      complete: () => {
        this.submit.emit();
      }
    });
  }

}
