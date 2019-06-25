import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-event',
  templateUrl: './route-event.page.html',
  styleUrls: ['./route-event.page.scss'],
})
export class RouteEventPage implements OnInit {

  constructor() { }

  ngOnInit() {

    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400,
    }
  }
}
