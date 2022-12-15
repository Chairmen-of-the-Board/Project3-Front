import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserRequest } from 'src/app/models/userrequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  amount: FormControl = new FormControl(['']);
  description: FormControl = new FormControl(['']);
  targetId: FormControl = new FormControl(['']);
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

  }

  attemptUpsert(amount: number, targetId: number, description: string){
    this.request.amount = amount;
    this.request.targetId = targetId;
    this.request.description = description;
    this.requestService.upsertRequest(this.request).subscribe({
      next: (response) => {
      },
      error: (err) => {

      },
      complete: () => {
        
      }
    });
  }

}
