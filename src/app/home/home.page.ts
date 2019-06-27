import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScrollDetail } from '@ionic/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform, NavController } from '@ionic/angular';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AppAvailability]
})
export class HomePage {

  weather:any;
  showToolbar = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform, 
    public splashscreen: SplashScreen,
    private iab: InAppBrowser,
    private file: File,
    private fileOpener: FileOpener,
    private documentViewer: DocumentViewer,
    private appAvailability: AppAvailability,
    private weatherService: WeatherService
    ) {
      
      // Function to block screen orientation.
      screen.orientation.lock('portrait'); 

      // Function to show animated splash screeen.
      platform.ready().then(() => { 
       
        // Function to Set time to Maratón
        let countDownDate = new Date("Oct 06, 2019 08:00:00").getTime();

        // Update the count down every 1 second
        let x = setInterval(function () {
        //Get Todays date and time.
        let now = new Date().getTime();
        //Find the discante between now and the count down date.
        let distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an HTML element 
        document.getElementById("timer").innerHTML = days + " | " + hours + " | "
          + minutes + " | " + seconds;

        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = "Llegó la Hora";
        }
      }, 1000);
    });
  }

  // Method to show PDF 
  showTerms(){
    let filePath = this.file.applicationDirectory + 'www/assets/documents';

    if(this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, 'Bases.pdf', this.file.dataDirectory, `${fakeName}.pdf`)
      .then(result => { this.fileOpener.open(result.nativeURL, 'application/pdf');
      });
    } else {
      const options: DocumentViewerOptions = {
        title: 'Bases'
      }
      this.documentViewer.viewDocument(`${filePath}/Bases.pdf`, 'application/pdf', options);
    }

  }

  // Method to track runners (Under construction)
  liveTracking() {
    this.navCtrl.navigateForward("/tracking");
  }

  // Method to show rout of the event.
  showRoute() {
    this.navCtrl.navigateForward("/route-event");
  }

  // Method to open Register Page on Web Browser
  registerPage() {
    this.iab.create('https://www.eventrid.cl/prokart/eventos/consalud-maraton-de-vina-del-mar-2019/participantes/inscripcion/iframe','_blank');
  }

  // Method to select application opening options.
  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    
    if(this.platform.is('ios')) {
      app = iosSchemaName;
    } else if(this.platform.is('android')) {
      app = androidPackageName;
    } else {
      this.iab.create(httpUrl + username, '_system');
      return;
    }
    this.appAvailability.check(app)
    // Succes Callback
    .then(() => {this.iab.create(appUrl + username, '_system');},
    // Error Callback
    (data) => {this.iab.create(httpUrl + username, '_system');});
  }

  // Method with necessary information to open Facebook app.
  openFacebook(username: string) {
    this.launchExternalApp('fb://','com.facebook.katana', 'fb://facewebmodal/f?href=', 'https://www.facebook.com/', username);
  }

  // Method with necessary information to open Instagram app.
  openInstagram(username: string) {
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', username);
  }
  
  // Method with necessary information to open Twitter app.
  openTwitter(username: string) {
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', username);
  }


  // Method to show Gallery Section
  showGallery() {
    this.navCtrl.navigateForward("/gallery");
  }

  // Method to show Viña del Mar Weather
  ionViewWillEnter(){
    this.weatherService.getWeather().subscribe(weather => {
      this.weather = weather;
      //console.log(weather)
    }); 
  }

  
  // Function to Show or Hide Toolbar.
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }

}
