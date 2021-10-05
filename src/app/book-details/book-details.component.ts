import { Component, OnInit } from '@angular/core';
import * as data from 'C:/Users/arsha/Book Master/bookmaster/src/app/_files/books.json';

interface Book {
  id: Number;
  title: String;
  isbn: String;
  pageCount: String;
  thumbnailUrl: String;
  shortDescription: String;
  longDescription: String;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  title = 'bookmaster';
  books

  constructor() { }

  ngOnInit(): void {
    this.books = data;
  }

}
