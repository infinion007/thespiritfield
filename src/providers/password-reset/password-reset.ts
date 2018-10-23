import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PasswordResetProvider {
  api_url = 'http://www.thespiritfield.com/wp-login.php?action=lostpassword&user_login';

  constructor(public http: HttpClient) {
    console.log('Hello PasswordResetProvider Provider');
  }

  getQuotes(){
    return this.http.get(this.api_url);
  }

  postQuote(lostpassword, Username){
    let data = {
      action: lostpassword,
      user_login: Username,
    };

    console.log(data);

    // let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    // console.log(token);

    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    // return this.http.post(this.api_url, data, {headers: headers});

    this.http.post(this.api_url, data);
  }

}
