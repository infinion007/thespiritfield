import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PasswordResetProvider } from '../../providers/password-reset/password-reset';



@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  private url2: string = "http://www.thespiritfield.com/wp-login.php";
  username;
  lostpassword = 'lostpassword';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private passReset: PasswordResetProvider,
              public http : Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }
  onPassRequest(){
    this.passReset.postQuote(this.lostpassword, this.username);
console.log(this.lostpassword);


  }
  getMessage(){
    this.http.get(this.url2).subscribe((r) => {
      let res = r.json();

      if(res.status == "error"){
        console.log('error');
        alert(res.error);
      }

      if(res.status == "ok"){
        console.log('ok');
        alert(res.msg);
      }

    });
console.log('end');
  }
  
}
