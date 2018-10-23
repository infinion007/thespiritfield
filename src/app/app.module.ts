import { HttpModule } from '@angular/http';
import { MyAccountPage } from './../pages/my-account/my-account';
import { BookingPage } from './../pages/booking/booking';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule} from "@angular/common/http";
import { PasswordResetProvider } from '../providers/password-reset/password-reset';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    BookingPage,
    MyAccountPage,
    PasswordResetPage,
    SignupPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    BookingPage,
    MyAccountPage,
    PasswordResetPage,
    SignupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    PasswordResetProvider,
    PasswordResetProvider
  ]
})
export class AppModule {}
