import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bookData } from '../interfaces/book-data.interface';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public books = [];
  public filteredBooks = [];
  public recentPublishedBooks = [];
  public showList: boolean = false;
  

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.sharedService.isLandingPage = true;
    let bookList = sessionStorage.getItem('booklist');
    if (!bookList) {
      this.sharedService.getBooks()
      .subscribe((data: bookData[]) => {
        data.forEach((book: bookData, index) => {
          book._id = index;
        })
        this.books = data;
        sessionStorage.setItem('booklist', JSON.stringify(data));
        this.filteredBooks = data;
        const tempData = [...data];
        this.sharedService.updateBooks.next([...data]);
      });
    } else {
      this.sharedService.updateBooks.next([...JSON.parse(bookList)]);
    }
    

    this.sharedService.searchSubject
      .subscribe((str: string) => {
        this.filteredBooks = this.books.filter(data => data['title'].toLowerCase().indexOf(str) > -1)
      });

      
  }
  
  ngOnDestroy(): void {
    // this.sharedService.searchSubject.unsubscribe();
  }
}
