import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  public bookData;

  constructor(private sharedService: SharedService) {
    this.bookData = this.sharedService.bookData;
  }

  ngOnInit(): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
  }

}
