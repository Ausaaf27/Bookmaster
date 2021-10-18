import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public books = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getBooks()
        .subscribe((data) => {
          this.books = data;
        })
  }

}
