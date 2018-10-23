import { TabsPage } from './../tabs/tabs';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toastCtrl: ToastController, 
    public storage: Storage, 
    public alertCtrl: AlertController, 
    private events: Events, 
    private loadingController: LoadingController, ) {

      this.username="";
      this.password="";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  login() {

    let loading = this.loadingController.create();
    loading.present();

    // Get Nonce
    this.http.get('http://www.thespiritfield.com/api/get_nonce/?controller=user&method=generate_auth_cookie&insecure=cool')
                .subscribe( (nonces) => {
                let nonceFetch = nonces.json();
                var nonceValue = nonceFetch.nonce;

    
    this.http.get("http://www.thespiritfield.com/api/auth/generate_auth_cookie/?nonce=+"+ nonceValue+"&username=" + this.username + "&password=" + this.password +"&insecure=cool")
      .subscribe((res) => {
                  console.log(res.json());
                  let response = res.json();
          
                  if (response.error) {
                    this.toastCtrl.create({
                      message: response.error,
                      duration: 5000
                    }).present();
          
                    loading.dismiss();
                    return;
                  }
          
          
                  this.storage.set("userLoginInfo", response).then((data) => {
          
                    this.alertCtrl.create({
                      title: "Welcome "+response.user.username + "!",
                      message: "You have been logged in successfully.",
                      buttons: [{
                        text: "OK",
                        handler: () => {
          
                          this.events.publish("user:loggedIn");
                          loading.dismiss();
          
                          if (this.navParams.get("next")) {
                            this.navCtrl.push(this.navParams.get("next"));
                          } else {
                            this.navCtrl.setRoot(TabsPage);
                          }
                        }
                      }]
                    }).present();
                  })
      }, 
      
      (err) => {
        loading.dismiss();
        this.toastCtrl.create({
            message: "An error occurred.",
            duration: 5000
          }).present();
      });
    });
  }
  
          

 
  retrievePassword() {

    let ale = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "We will send you an email with the link to reset your password.",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Retrieve',
          handler: data => {
                let loading = this.loadingController.create();
                loading.present();
            if(data.username.length > 0){
              this.http.get("http://thespiritfield.com/api/user/retrieve_password/?insecure=cool&user_login=" + data.username).subscribe
                  (data => {
                    let msg = data.json();
                        const alert = this.alertCtrl.create({
                          title: 'Reset link send!',
                          subTitle: msg.msg,
                          buttons: ['OK']
                    });
                    loading.dismiss();
                    alert.present();
                  },
                  err => {
                    let msg = (err.json());
                        const alert = this.alertCtrl.create({
                          title: 'Attention!',
                          subTitle: msg.error,
                          buttons: ['OK']
                    });
                    loading.dismiss();
                    alert.present();
                  });
            }
            if(data.username.length === 0){
              const alert = this.alertCtrl.create({
                title: 'Email or Username',
                subTitle: 'Please enter your email or username to reset your password.',
                buttons: ['OK']
              });
              alert.present();
            }
          }
        }
      ]
    });
    ale.present();
  }


  goToSignup() {
    this.navCtrl.push(SignupPage);
  }
}
