import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchString

  constructor(public sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  public filterBooks(str: string) {debugger
    this.sharedService.searchSubject.next(str.toLowerCase());
  }

  public switchTab(tab: string) {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    if (tab === "home") {
      document.getElementById('home-tab').classList.add('active');
      this.router.navigate(['landing-page/recent-books']);
    } else {
      document.getElementById('list-tab').classList.add('active');
      this.router.navigate(['landing-page/book-list']);
    }
    
  }
}
