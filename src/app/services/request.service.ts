import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserRequest } from '../models/userrequest';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userId!: string;
  accountId!: string;
  userAccount: any;
  requestUrl: string = environment.url+'request';

  constructor(private http: HttpClient) { }


  getIncoming(): Observable<UserRequest[]>{
    this.userId = localStorage.getItem('current-user') || '';
    return this.http.get<UserRequest[]>(this.requestUrl+`/${this.userId}/incoming`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getOutgoing(): Observable<UserRequest[]>{
    this.accountId = localStorage.getItem('current-account') || '';
    return this.http.get<UserRequest[]>(this.requestUrl+`/${this.accountId}/outgoing`, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  upsertRequest(request: UserRequest): Observable<UserRequest>{
    environment.headers['Current-User'] = this.userId;
    return this.http.post<UserRequest>(this.requestUrl, request, {withCredentials: environment.withCredentials});
  }

}
