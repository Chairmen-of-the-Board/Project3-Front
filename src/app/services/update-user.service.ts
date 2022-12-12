import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {


  authUrl: string = environment.url+'auth';

  constructor(private http: HttpClient) { 
    
  }

  updateUser(id: number, 
          email: string, password: string, address: string, phone: string): Observable<any> {
    
    const payload = {id:id, email: email, password: password, address: address, phone: phone};
    console.log(payload);
    return this.http.put<any>(`${this.authUrl}`+ '/update', payload, {headers: environment.headers});
  }
}
