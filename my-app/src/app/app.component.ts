import { Component, OnInit } from '@angular/core';
import { AppService } from './Services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  public rootURL = '/api';
  public sampleData: any = '';

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getSampleData();
  }

  getSampleData(): void {
    this.appService.getSampleData().subscribe((data: any) => {
      this.sampleData = data;
      console.log('sampleData-', this.sampleData);
    });
  }
}
