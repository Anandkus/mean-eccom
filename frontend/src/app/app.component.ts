import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  screenHeight: any;
  screenWidth: any;
  footerMaxHeight!: number;

  constructor() {
    this.getScreen()
  }

  @HostListener("window:resize", ['$evnet'])
  getScreen() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxHeight = this.screenHeight - 160;
  }

}
