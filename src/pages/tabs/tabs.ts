import { MyAccountPage } from './../my-account/my-account';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BookingPage } from '../booking/booking';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BookingPage;
  tab3Root = MyAccountPage;

  constructor() {

  }
}
