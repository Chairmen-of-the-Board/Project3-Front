import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  authUrl: string = environment.url+'auth';
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const creds = {email: email, password: password};
    const payload = JSON.stringify(creds);
    return this.http.post<User>(this.authUrl+'/login', payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(email: string, password: string, firstname: string, lastname: string, address: string, phone: string): Observable<any> {
    const payload = {email: email, password: password, firstname: firstname, lastname: lastname, address: address, phone: phone};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  getUser(userId: any): Promise<User>{
    const ret = this.http.get<User>(`${this.authUrl}/`+userId, {headers: environment.headers});
    return firstValueFrom(ret);
  }

  }





