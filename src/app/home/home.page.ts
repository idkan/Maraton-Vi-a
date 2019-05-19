import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  splash = true;
  
  constructor(public platform: Platform, public splashscreen: SplashScreen) {
      
    platform.ready().then(() => {
      
      setTimeout(() => this.splash = false,4000);
      splashscreen.hide();
    });
  }

}
