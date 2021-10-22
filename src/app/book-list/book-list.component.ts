import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { bookData } from '../interfaces/book-data.interface';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public bookData = [];
  public dataSource = new MatTableDataSource<any>(this.bookData);
  public displayedColumns = ['thumbnailUrl', 'title', 'authors', 'shortDescription', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() showDescription: EventEmitter<number> = new EventEmitter();

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.bookData);
    this.dataSource.paginator = this.paginator;
  }

  constructor(public sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    document.getElementById('list-tab').classList.add('active');
    this.sharedService.updateBooks
      .subscribe((booklist) => {
        debugger
        if (booklist) {
          this.bookData = booklist;
          this.resetTable(this.bookData);
        }
      });
  }

  public getRecord(book) {
    // this.showDescription.emit(book);
    this.sharedService.openDescription(book);
  }

  public editBook(book, event: Event) {
    event.stopPropagation();
    this.router.navigate(['addeditbook']);
    this.sharedService.editBook.next(book);
  }

  public filterBooks(value) {
    let booklist: bookData[] = JSON.parse(sessionStorage.getItem('booklist'));
    booklist = booklist.filter((book: bookData) => book.title.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    this.resetTable(booklist);
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
    this.dataSource.paginator = this.paginator;
  }

}
