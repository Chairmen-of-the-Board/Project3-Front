import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Transfer } from '../models/transfer';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userID!: string;
  userAccount: any;
  requestURL: string = environment.url+'transfer';

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getIncoming(): Observable<Transfer[]>{
    this.userID = localStorage.getItem('current-user') || '';
    return this.http.get<Transfer[]>(this.requestURL+`/${this.userID}/incoming`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getOutgoing(): Observable<Transfer[]>{
    this.userAccount = this.accountService.getAccount();
    return this.http.get<Transfer[]>(this.requestURL+`/${this.userAccount.id}/outgoing`, {headers: environment.headers, withCredentials: environment.withCredentials})

  }

}
