import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { bookData } from '../interfaces/book-data.interface';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-recent-book',
  templateUrl: './recent-book.component.html',
  styleUrls: ['./recent-book.component.scss']
})
export class RecentBookComponent implements OnInit {

  public bookData: bookData[] = [];
  public displayedColumns = ['thumbnailUrl', 'title', 'authors', 'shortDescription'];
  public dataSource = new MatTableDataSource<bookData>(this.bookData);
  public showDescription = new EventEmitter<any>();
  private booksSubscription = new Subscription();

  constructor(public sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    document.getElementById('home-tab').classList.add('active');
    this.booksSubscription.add(
      this.sharedService.updateBooks
      .subscribe((booklist) => {debugger
        if (booklist) {
          const tempData: bookData[] = [...booklist];
          this.bookData = tempData;
          this.bookData = tempData.sort((a, b) => (a?.publishedDate?.$date < b?.publishedDate?.$date) ? 1 : -1);
          this.bookData.length = this.bookData.length < 10 ? this.bookData.length : 10;
          document.getElementsByClassName('active')[0].classList.remove('active');
          document.getElementById('home-tab').classList.add('active');
          this.dataSource = new MatTableDataSource<any>(this.bookData);
        }
        
      })
    );
  }

  public getRecord(book) {
    // this.showDescription.emit(book);
    this.sharedService.openDescription(book);
  }

  ngOnDestroy(): void {
    // this.booksSubscription.unsubscribe();
  }

  public delete(book, event: Event) {
    event.stopPropagation();
    let booklist: bookData[] = JSON.parse(sessionStorage.getItem('booklist'));
    booklist.splice(book['_id'], 1);
    booklist.forEach((book, index) => {
      book._id = index;
    })
    sessionStorage.setItem('booklist', JSON.stringify([...booklist]));
    this.resetTable(booklist);
  }

  public resetTable(data) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

}
