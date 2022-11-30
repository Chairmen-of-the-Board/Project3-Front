import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { Transfer } from '../models/transfer';

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

   // now gets one specific account by its own id number, not by user id
   getAccount(): Observable<Account> {
    //need to call to local storage here or else account ID won't update
    this.refreshStorage();
    // changed below to this.accountId (because there is more than one account to get for each user)
    return this.http.get<Account>(this.accountUrl+`/${this.accountId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   // created this to get multiple user accounts
  getAllAccounts(): Observable<Account[]> {
    //need to call to local storage here or else account ID won't update
    this.refreshStorage();
    return this.http.get<Account[]>(this.accountUrl+`/${this.userId}/all`, {headers: environment.headers, withCredentials: environment.withCredentials});
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

   // creates a transfer and returns the originating account
  createTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.accountUrl+'/transfer', transfer, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   refreshStorage(){
    this.userId = localStorage.getItem('current-user') || '';
    this.accountId = localStorage.getItem('current-account') || '';
   }

}
