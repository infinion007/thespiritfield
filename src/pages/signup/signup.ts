import { Http, Response  } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email;
  username;
  password;
  display_name;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController,
              public http: Http,
              public alertCtrl: AlertController,
              private loadingController: LoadingController,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let loading = this.loadingController.create();
    loading.present();

    let validEmail = false;

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.email)){
      this.http.get('http://www.thespiritfield.com/api/get_nonce/?controller=user&method=register&insecure=cool')
                .subscribe( (nonces: Response) => {
                let nonceFetch = nonces.json();
                var nonceValue = nonceFetch.nonce;


                this.http.get("http://www.thespiritfield.com/api/user/register/?username="+this.username+"&email="+this.email+"&nonce="+nonceValue+"&display_name="+this.display_name+"&notify=both&user_pass="+this.password+"&insecure=cool").subscribe
                (data => {
                      const alert = this.alertCtrl.create({
                        title: 'Done!',
                        subTitle: 'User has been created sucessfully.',
                        buttons: ['Login']
                  });
                  loading.dismiss();
                  alert.present();
                  this.navCtrl.pop();
                },
                err => {
                  let msg = (err.json());
                      const alert = this.alertCtrl.create({
                        title: 'Failed!',
                        subTitle: msg.error,
                        buttons: ['OK']
                        
                  });
                  loading.dismiss();
                  alert.present();
                });
                 });
      // email looks valid

      // this.WooCommerce.getAsync('customers/email/' + this.email).then( (data) => {
      //   let res = (JSON.parse(data.body));

      //   if(res.errors){
      //     validEmail = true;

      //     this.toastCtrl.create({
      //       message: "Congratulations. Email is good to go.",
      //       duration: 3000
      //     }).present();

      //   } else {
      //     validEmail = false;

      //     this.toastCtrl.create({
      //       message: "Email already registered. Please check.",
      //       showCloseButton: true
      //     }).present();
      //   }

      //   console.log(validEmail);

      // })

      


    } else {
     // loading.dismiss();
      validEmail = false;
      this.toastCtrl.create({
        message: "Invalid Email. Please check.",
        showCloseButton: true
      }).present();
      console.log(validEmail);
    
//---------------------------------------------------------------------------------
  }
  loading.dismiss();

}




}
