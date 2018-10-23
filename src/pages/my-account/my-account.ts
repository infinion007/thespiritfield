import { LogInPage } from './../log-in/log-in';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Http } from '@angular/http';
/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  user: {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public app: App,
              public http : Http,
              public storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  Logout() {
    const confirm = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you shure you want to Log Out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            console.log('Agree clicked');
           // localStorage.removeItem('wpIonicToken');
           // this.navCtrl.setRoot(LoginPage);
           this.storage.remove("userLoginInfo");
           var nav = this.app.getRootNav();
           nav.setRoot(LogInPage);
          }
        }
      ]
    });
    confirm.present();
  }

  }



