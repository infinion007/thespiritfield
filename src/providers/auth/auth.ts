import { environment } from './../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthProvider {
  api_url = environment.site_url+environment.jwt_url;
  

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  postLogin(username, password){
    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.api_url, data, {headers: headers});
  }

}