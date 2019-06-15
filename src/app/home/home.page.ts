import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScrollDetail } from '@ionic/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  splash = true;
  showToolbar = false;

  constructor(
    public platform: Platform, 
    public splashscreen: SplashScreen,
    private iab: InAppBrowser,
    private file: File,
    private fileTransfer:FileTransfer,
    private fileOpener: FileOpener,
    private documentViewer: DocumentViewer
    ) {
      
    screen.orientation.lock('portrait'); 
    platform.ready().then(() => { 
      setTimeout(() => this.splash = false,4000);
      this.splashscreen.hide(); 

      //Set time to Maratón
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
        //console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

        // Output the result in an element with id="demo"
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

  registerPage(){
    this.iab.create('https://www.eventrid.cl/prokart/eventos/consalud-maraton-de-vina-del-mar-2019/participantes/inscripcion/iframe','_blank');
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

}
