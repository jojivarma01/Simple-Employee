import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  // title = 'ng-carousel-demo';
   
  // images = [
  //   {title: 'First Slide', short: 'First Slide Short', src: "../../../assets/images/image1.jpg"},
  //   {title: 'Second Slide', short: 'Second Slide Short', src: "../../../assets/images/image2.jpg"},
  //   {title: 'Third Slide', short: 'Third Slide Short', src: "../../../assets/images/image3.jpg"}
  // ];
   
  // constructor(config: NgbCarouselConfig) {
  //   //config.interval = 2000;
  //   //config.keyboard = true;
  //   config.pauseOnHover = true;
  // }

  ngOnInit(): void {
  }


}
