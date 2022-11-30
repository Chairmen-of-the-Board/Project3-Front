import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userId!: string;
  accountUrl: string = environment.url+'account';
  accountId: string = '';

  constructor(private http: HttpClient) {
    //get inital user values on initialization
    this.refreshStorage();
   }

   getAccount(): Observable<Account> {
    //need to call to local storage here or else account ID won't update
    this.refreshStorage();
    return this.http.get<Account>(this.accountUrl+`/${this.userId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   getTransactions(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.accountUrl+`/${accountId}/transaction`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   upsertAccount(account: Account): Observable<Account> {
    environment.headers['Current-User'] = this.userId;
    return this.http.post<Account>(this.accountUrl, account, {headers: environment.headers, withCredentials: environment.withCredentials});
   }
   
   createTransaction(accountId: string, txn: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.accountUrl+`/${accountId}/transaction`, txn, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   refreshStorage(){
    this.userId = localStorage.getItem('current-user') || '';
    this.accountId = localStorage.getItem('current-account') || '';
   }

}
