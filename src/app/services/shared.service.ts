import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public searchSubject = new BehaviorSubject<string>('');
  public updateBooks = new BehaviorSubject<any>(null);
  public editBook = new BehaviorSubject<any>(null);
  public bookData={};
  public isLandingPage: boolean = true;
  public recentBooks = [];
  public bookList = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  booksUrl = 'assets/books.json';

  getBooks() {
    return this.httpClient.get<any>(this.booksUrl);
  }

  public openDescription(book) {
    this.bookData = book;
    this.isLandingPage = false;
    this.router.navigateByUrl('description');
  }
}
